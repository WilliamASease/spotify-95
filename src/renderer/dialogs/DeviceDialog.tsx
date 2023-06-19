import { isNil } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Checkbox, Toolbar } from 'react95';
import { FlexWindowModal } from 'renderer/conveniencesdk/FlexWindowModal';
import Label from 'renderer/sdk/Label';
import { selectSpotify } from 'renderer/state/store';

type IProps = {
  isOpen: boolean;
  closeThisWindow: () => void;
};

export const DeviceDialog = (props: IProps) => {
  const { isOpen, closeThisWindow } = props;
  const spotify = useSelector(selectSpotify);
  const [devices, setDevices] = useState<SpotifyApi.UserDevicesResponse>();
  const [selectedIndex, setSelectedIndex] = useState<number>();
  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(undefined);
      spotify.getMyDevices().then((devices) => setDevices(devices));
    }
  }, [spotify, isOpen]);

  const getDeviceComponent = useCallback(
    (
      index: number,
      selectedIndex: number | undefined,
      devices: SpotifyApi.UserDevicesResponse
    ) => {
      const device = devices.devices[index];
      return (
        <Toolbar>
          <Label>
            {device.type === 'Computer'
              ? '🖥️'
              : device.type === 'Smartphone'
              ? '📱'
              : device.type === 'Speaker'
              ? '🔊'
              : '?'}
          </Label>
          <Checkbox
            checked={index === selectedIndex}
            onClick={() => setSelectedIndex(index)}
          />
          <Label>{device.name}</Label>
          {device.is_active && <Label>[active]</Label>}
        </Toolbar>
      );
    },
    [setSelectedIndex]
  );

  return (
    <FlexWindowModal
      title={'Select Device'}
      height={100 + 50 * (!isNil(devices) ? devices.devices.length : 0)}
      width={500}
      isOpen={isOpen}
      onClose={closeThisWindow}
      provideCloseButton
      bottomButtons={[
        {
          text: 'Cancel',
          onPress: () => {},
          closesWindow: true,
        },
        {
          text: 'Transfer Playback',
          onPress: () => {
            if (selectedIndex) {
              spotify.transferMyPlayback([
                devices?.devices[selectedIndex].id ?? '',
              ]);
            }
          },
          closesWindow: true,
          disabled: isNil(selectedIndex),
        },
      ]}
    >
      {devices?.devices.map((d, i) => {
        return getDeviceComponent(i, selectedIndex, devices);
      })}
    </FlexWindowModal>
  );
};