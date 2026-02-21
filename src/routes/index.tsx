import { AudioPlayer } from "~/components/audio-player";

export default function Home() {
  return (
    <main>
      <div>
        Forest: <AudioPlayer soundPath="/audio/forest.mp3" />
      </div>
      <div>
        Fireplace: <AudioPlayer soundPath="/audio/fireplace.mp3" />
      </div>
      <div>
        Cafe: <AudioPlayer soundPath="/audio/cafe.mp3" />
      </div>
      <div>
        Ocean: <AudioPlayer soundPath="/audio/ocean.mp3" />
      </div>
      <div>
        Rain: <AudioPlayer soundPath="/audio/rain.mp3" />
      </div>
    </main>
  );
}
