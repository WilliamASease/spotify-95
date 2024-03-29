import { useDispatch, useSelector } from 'react-redux';
import { Button, Frame, ScrollView, Slider, Toolbar } from 'react95';
import {
  selectCurrentDevice,
  selectPlayerView,
  selectSpotify,
  selectTracksInPlayer,
  selectPlaybackItem,
  selectPlaybackState,
  setToPlayer,
  setErrorMessage,
  setPlaybackItem,
} from 'renderer/state/store';
import { formatArtists, formatMs } from 'renderer/functions/formatFunctions';
import { AlternateGrey } from 'renderer/sdk/ThemedComponents';
import { FlexColumn } from 'renderer/sdk/FlexElements';
import { useCallback, useState } from 'react';
import Label from 'renderer/sdk/Label';
import { isNil } from 'lodash';
import { Playable } from 'renderer/representations/apiTypes';
import { putOnRecord } from 'renderer/functions/apiFunctions';

export function PlayerList() {
  const dispatch = useDispatch();

  const tracksInPlayer = useSelector(selectTracksInPlayer);
  const spotify = useSelector(selectSpotify);
  const playerView = useSelector(selectPlayerView);
  const playbackState = useSelector(selectPlaybackState);
  const nowPlaying = useSelector(selectPlaybackItem);
  const currentDevice = useSelector(selectCurrentDevice);

  const [highlighted, setHighlighted] = useState<number>(0);
  const compileTrackInfo = useCallback(
    (item: Playable) =>
      item.type === 'track'
        ? [`${formatArtists(item.artists)}`, `${item.album.name}`]
        : [item.show.name],
    []
  );
  const checkActionable = useCallback(() => {
    if (isNil(playbackState?.device)) {
      dispatch(
        setErrorMessage(
          'No Devices! Make sure you have a spotify client running on a device.'
        )
      );
      return false;
    }
    return true;
  }, [playbackState?.device]);

  return (
    <FlexColumn style={{ flexGrow: 1 }}>
      <Frame variant="field" style={{ flexGrow: 1 }}>
        <ScrollView
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            display: 'flex',
          }}
        >
          {tracksInPlayer.map((itm, i) => {
            const compiledTrackInfo = compileTrackInfo(itm);
            const playThisTrack = () => {
              if (i === highlighted) {
                putOnRecord(
                  spotify,
                  tracksInPlayer.slice(i, tracksInPlayer.length),
                  () =>
                    dispatch(
                      setErrorMessage(
                        'No Devices! Make sure you have a spotify client running on a device.'
                      )
                    )
                );
              }
              setHighlighted(i);
            };
            return (
              <>
                {playerView === 'individual' && (
                  <AlternateGrey
                    index={i}
                    isSelected={i === highlighted}
                    onClick={playThisTrack}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <div style={{ width: '3rem' }}>
                        {formatMs(itm.duration_ms)}
                      </div>
                      <div style={{ width: '2rem' }}>
                        {itm.type === 'track' ? '🎵' : '📝'}
                      </div>
                      <div style={{ width: '25rem' }}>{itm.name}</div>
                      <div style={{ width: '20rem' }}>
                        {compileTrackInfo(itm).map((s, i) =>
                          i % 2 === 0 ? <Label>{s}</Label> : <div>{s}</div>
                        )}
                      </div>
                      <div
                        style={{
                          width: '2rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        {nowPlaying?.id === itm.id ? '💿' : ''}
                      </div>
                    </div>
                  </AlternateGrey>
                )}
                {playerView === 'group' && (
                  <>
                    {(i === 0 ||
                      JSON.stringify(
                        compileTrackInfo(tracksInPlayer[i - 1])
                      ) !== JSON.stringify(compileTrackInfo(itm))) && (
                      <div>
                        <Label>{`${compiledTrackInfo[0]} ${
                          itm.type === 'track'
                            ? `/ ${compiledTrackInfo[1]}`
                            : ``
                        }`}</Label>
                      </div>
                    )}
                    <AlternateGrey
                      index={1}
                      isSelected={i === highlighted}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginLeft: '2rem',
                      }}
                      onClick={playThisTrack}
                    >
                      <div style={{ width: '3rem' }}>
                        {formatMs(itm.duration_ms)}
                      </div>
                      <div style={{ width: '2rem' }}>
                        {itm.type === 'track' ? '🎵' : '📝'}
                      </div>
                      <div style={{ width: '43rem' }}>{itm.name}</div>
                      <div
                        style={{
                          width: '2rem',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        {nowPlaying?.id === itm.id ? '💿' : ''}
                      </div>
                    </AlternateGrey>
                  </>
                )}
              </>
            );
          })}
        </ScrollView>
      </Frame>

      <Toolbar style={{ justifyItems: 'center' }}>
        {isNil(nowPlaying) ? (
          `[Nothing Playing]`
        ) : (
          <>
            <Label style={{ marginLeft: '1rem' }}>
              {nowPlaying.type === 'track' ? `Artist: ` : `Show: `}
            </Label>
            <span>
              {nowPlaying.type === 'track'
                ? formatArtists(nowPlaying.artists)
                : nowPlaying.show.name}
            </span>
            {nowPlaying.type === 'track' && (
              <>
                <Label style={{ marginLeft: '1rem' }}>Album:</Label>
                <span>{nowPlaying.album.name}</span>
              </>
            )}
            <Label style={{ marginLeft: '1rem' }}>Name:</Label>
            <span>{nowPlaying.name}</span>
          </>
        )}
      </Toolbar>
      <Slider
        size={800}
        value={
          ((playbackState?.progress_ms ?? 0) / (nowPlaying?.duration_ms ?? 0)) *
          100
        }
        style={{ marginLeft: '1.4rem', marginBottom: '0' }}
        orientation="horizontal"
        onChangeCommitted={(value) =>
          spotify.seek(
            Math.floor(((nowPlaying?.duration_ms ?? 0) / 100) * value)
          )
        }
      />
      <Toolbar style={{ marginLeft: '1rem' }}>
        <Button
          onClick={() => {
            if (!checkActionable()) return;
            if (!playbackState?.is_playing) spotify.play();
          }}
          disabled={playbackState?.is_playing}
          className="toolbarButton"
        >
          ⏵
        </Button>
        <Button
          disabled={!playbackState?.is_playing}
          onClick={() => {
            if (!checkActionable()) return;

            if (playbackState?.is_playing) spotify.pause();
          }}
          className="toolbarButton"
        >
          ⏸
        </Button>
        <Button
          disabled={!playbackState?.is_playing}
          onClick={() => {
            if (!checkActionable()) return;

            if (playbackState?.is_playing) spotify.pause();
            spotify.seek(0);
          }}
          className="toolbarButton"
        >
          ⏹
        </Button>
        <Button
          onClick={() => {
            if (!checkActionable()) return;

            if (playbackState?.is_playing) spotify.pause();
            spotify.seek(0);
            dispatch(setToPlayer([]));
          }}
          className="toolbarButton"
        >
          ⏏
        </Button>
        <Button
          onClick={() => {
            if (!checkActionable()) return;

            if ((playbackState?.progress_ms ?? 0) < 5000) {
              let currentItemIndex = tracksInPlayer.findIndex(
                (playable) => playable.id === playbackState?.item?.id
              );
              let notBelowZero =
                currentItemIndex - 1 < 0 ? 0 : currentItemIndex - 1;
              spotify.play({
                uris: tracksInPlayer
                  .slice(notBelowZero, tracksInPlayer.length)
                  .map((playable) => playable.uri),
              });
            } else spotify.seek(0);
          }}
          className="toolbarButton"
        >
          ⏮
        </Button>
        <Button
          onClick={() => {
            if (!checkActionable()) return;

            spotify.skipToNext();
          }}
          className="toolbarButton"
        >
          ⏭
        </Button>
        <Button
          variant={playbackState?.repeat_state === 'track' ? 'flat' : 'default'}
          onClick={() => {
            {
              if (!checkActionable()) return;
              spotify.setRepeat(
                playbackState?.repeat_state === 'off' ? 'track' : 'off'
              );
            }
          }}
          className="toolbarButton"
        >
          Repeat
        </Button>
        <Button
          onClick={() => {
            if (!checkActionable()) return;
            spotify.setShuffle(!playbackState?.shuffle_state);
          }}
          variant={playbackState?.shuffle_state ? 'flat' : 'default'}
          className="toolbarButton"
        >
          Shuffle
        </Button>
        <Button
          disabled={!playbackState?.is_playing}
          onClick={() => {
            if (playbackState?.is_playing) {
              const seek = (playbackState?.progress_ms ?? 15000) - 15000;
              spotify.seek(seek >= 0 ? seek : 0);
            }
          }}
          className="toolbarButton"
        >
          ⏴ 15s
        </Button>
        <Button
          disabled={!playbackState?.is_playing}
          onClick={() => {
            if (playbackState?.is_playing) {
              let seek = (playbackState?.progress_ms ?? 0) + 15000;
              if (seek > (nowPlaying?.duration_ms ?? 0)) {
                seek = nowPlaying?.duration_ms ?? 0;
              }
              spotify.seek(seek);
            }
          }}
          className="toolbarButton"
        >
          15s ⏵
        </Button>
        <span style={{ marginLeft: '.5rem', marginRight: '.5rem' }}>
          {formatMs(playbackState?.progress_ms ?? 0)} /{' '}
          {formatMs(nowPlaying?.duration_ms ?? 0)}
        </span>
      </Toolbar>
    </FlexColumn>
  );
}
