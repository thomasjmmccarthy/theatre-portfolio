import { SVCarousel } from "../../pages/spotlight-viewer/components/SVCarousel";
import { SVCornerImage } from "../../pages/spotlight-viewer/components/SVCornerImage";
import { SVDescription } from "../../pages/spotlight-viewer/components/SVDescription";
import { SVFullCompany } from "../../pages/spotlight-viewer/components/SVFullCompany";
import { SVHr } from "../../pages/spotlight-viewer/components/SVHr";
import { SVImageSection } from "../../pages/spotlight-viewer/components/SVImageSection";
import { SVPage } from "../../pages/spotlight-viewer/components/SVPage";
import { SVTextSection } from "../../pages/spotlight-viewer/components/SVTextSection";
import { SVTitle } from "../../pages/spotlight-viewer/components/SVTitle";
import { createSpotlightEntry } from "../../pages/spotlight-viewer/createSpotlightEntry";

import corner_header from './assets/corner-header.jpg';
import sec_01 from './assets/sec-01.png';
import sec_02 from './assets/sec-02.jpg';
import sec_03 from './assets/sec-03.jpg';
import sec_04 from './assets/sec-04.png';

import gallery_00 from './assets/gallery-00.JPG';
import gallery_01 from './assets/gallery-01.jpg';
import gallery_02 from './assets/gallery-02.png';
import gallery_03 from './assets/gallery-03.png';


export function MirrorCircleSpotlight() {

  const s = createSpotlightEntry('mirror-circle');

  const gallery = [
    { src: gallery_00, title: 'Set', caption: 'Set created by Annie Davison & Nell Hemmingfield' },
    { src: gallery_01, title: 'Set Sketch', caption: 'Original set sketch for Mirror Circle.' },
    { src: gallery_02, title: 'Mood Board', caption: 'Images used as design reference' },
    { src: gallery_03, title: 'Crow Bible Excerpt', caption: 'A document used throughout the rehearsal process to track the entrances/exits of the Crows' }
  ]

  return (
    <SVPage>
      <SVCornerImage src={corner_header} />
      <SVTitle s={s} />
      <SVDescription s={s} />
      <SVHr />

      <SVTextSection>
        <i>Mirror Circle.</i> was my <b>fourth and final original production with the University of York Drama Society</b>, bringing together 
        everything I had learnt over three years of writing, directing, and technical theatre. Exploring themes of generational 
        trauma and cyclical time, the production combined an abstract script with an expressionistic visual language, creating 
        a world where <b>memory, reality, and folklore coexist within a single, ever-changing space.</b>
      </SVTextSection>

      <SVImageSection label='The Forest' left src={sec_01} caption='Lauren Brine' credit='Ella Tomlin'>
        From the outset, our production aimed to embrace its axpressionistic elements. The 'junk pile in a forest' setting of the play was used 
        as a liminal space, where lighting, sound, video, and set collaborated to embody each of the play's varying locations.<br/>
        To increase the immersion, and the sense of being lost in a forest, <b>the audience were sat along three sides of the stage</b>, enclosing the space 
        and putting them closer to the performance. While not playing their main roles, actors would often embody The Crows - <b>a masked, ensemble-style chorus that would 
        linger at the fringes of the stage,</b> sometimes even behind the audience.
      </SVImageSection>

      <SVImageSection label='The Nest' src={sec_02} caption='Mariam Nachif & Lauren Brine' credit='Ella Tomlin'>
        Mirror Circle, a multi-level marketing company, features prominently within the world of the play, and so extensive research went in to accurately depicting the <b>manipulation and 
        indoctrination tactics deployed by real-life MLMs.</b> The similarity of these techniques to those used by cults became the inspiration behind <i>The Inner Circle</i>. This group of 
        cultish die-hards lies at the heart of the company, led-in part by the charismatic social-chameleon, Zephyr (<i>Mariam Nachif</i>). Zephyr was modelled off of the traditional 
        psychopath archetype, going so far as to <b>wear red-tinted sunglasses to hide the lack of expression in their eyes.</b><br/>
        Meanwhile the other characters that join Mirror Circle, Eve (<i>Lauren Brine</i>) and Oakley (<i>Lydia Hughes</i>), show the reality of these organisations - the victims at the bottom, making next to 
        nothing off of the promise that <b>their devotion to the company may, one day, be recognised.</b>
      </SVImageSection>

      <SVImageSection label='The Tracker & The Doe' left src={sec_03} caption='Shannon Timms' credit='Ella Tomlin'>
        The play deliberately intertwines two narratives: Eve's struggle with the Mirror Circle organisation, and <b>a childhood fable</b> told to her by her mother: <i>The 
        Tracker & The Doe</i>. As the two stories begin to mirror one another, characters start to blend more and more between them, from Eve's mother appearing 
        as a deer, to her father entering as the tracker, to the malignant Red Eyed Crow. Just like Eve, <b>we are never allowed to leave the forest,</b> and 
        so can never be entirely sure of what is real, and what exists solely in her head.
      </SVImageSection>

      <SVImageSection label='The End of a Chapter' src={sec_04} caption='The Inner Circle'>
        As my final original production with the University of York Drama Society, <i>Mirror Circle.</i> became the culmination of my university theatre experience. It brought together <b>the storytelling, directing, 
        and visual techniques</b> I had developed across almost thirty productions into a single work that was ambitious in both its structure and its execution. In recognition of the amazing team that made the show 
        possible, <i>Mirror Circle.</i> received Drama Society awards for visual design, sound design, and character work - becoming <b>the first show in the society's history to win all three design categories.</b>
      </SVImageSection>

      <SVHr />
      <SVCarousel label="More from 'Mirror Circle.'" gallery={gallery} />

      <SVHr />
      <SVFullCompany s={s} />
    </SVPage>
  )

}