import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { AppraisalReel } from "./AppraisalReel";
import { EkaboReel } from "./EkaboReel";
import { HomeRedFlagsCarousel } from "./HomeRedFlagsCarousel";
import { NewsCarousel } from "./NewsCarousel";
import { NewsPhotoCover } from "./NewsPhotoCover";
import { RealEstateJourney } from "./RealEstateJourney";
import { SubjectToReel } from "./SubjectToReel";
import { FPS as ST_FPS, DURATION_SECONDS as ST_SECONDS } from "./subjectto-data";
import { FPS, TOTAL_SECONDS } from "./reel-data";
import { FPS as EKABO_FPS, TOTAL_SECONDS as EKABO_SECONDS } from "./ekabo-data";
import { SLIDES, CAROUSEL_W, CAROUSEL_H } from "./carousel-data";
import { POST_A, POST_B, NEWS_W, NEWS_H } from "./news-carousel-data";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AppraisalReel"
        component={AppraisalReel}
        durationInFrames={Math.round(TOTAL_SECONDS * FPS)}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="EkaboReel"
        component={EkaboReel}
        durationInFrames={Math.round(EKABO_SECONDS * EKABO_FPS)}
        fps={EKABO_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="HomeRedFlagsCarousel"
        component={HomeRedFlagsCarousel}
        durationInFrames={SLIDES.length}
        fps={1}
        width={CAROUSEL_W}
        height={CAROUSEL_H}
      />
      <Composition
        id="NewsPostA"
        component={NewsCarousel}
        durationInFrames={POST_A.length}
        fps={1}
        width={NEWS_W}
        height={NEWS_H}
        defaultProps={{ post: "A" }}
      />
      <Composition
        id="NewsPostB"
        component={NewsCarousel}
        durationInFrames={POST_B.length}
        fps={1}
        width={NEWS_W}
        height={NEWS_H}
        defaultProps={{ post: "B" }}
      />
      <Composition
        id="NewsPhotoCover"
        component={NewsPhotoCover}
        durationInFrames={1}
        fps={1}
        width={NEWS_W}
        height={NEWS_H}
        defaultProps={{ post: "A", variant: "a" }}
      />
      <Composition
        id="SubjectToReel"
        component={SubjectToReel}
        durationInFrames={Math.round(ST_SECONDS * ST_FPS)}
        fps={ST_FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="RealEstateJourney"
        component={RealEstateJourney}
        durationInFrames={1}
        fps={1}
        width={1080}
        height={1350}
      />
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
