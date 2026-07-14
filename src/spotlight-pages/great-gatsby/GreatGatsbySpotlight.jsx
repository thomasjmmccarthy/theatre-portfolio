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
import sec_02 from './assets/sec-02.png';
import sec_03 from './assets/sec-03.png';


export function GreatGatsbySpotlight() {

  const s = createSpotlightEntry('great-gatsby');

  return (
    <SVPage>
      <SVCornerImage src={corner_header} />
      <SVTitle s={s} />
      <SVDescription s={s} />
      <SVHr />

      <SVTextSection>
        Set within the glamour and excess of the Roaring Twenties, lighting <i>The Great Gatsby</i> required balancing 
        the <b>vibrant theatricality</b> of the jazz age with the <b>darker, seedier undertones</b> seen in Fitzgerald’s world. 
        Packed with recurring visual motifs, a vibrant colour palette, and a plethora of lighting effects, <i>Gatsby's</i> shifting 
        emotional tone presented my <b>most challenging design to date.</b>
      </SVTextSection>

      <SVImageSection label='Lighting as Architecture' left src={sec_01} caption='Corin Alford & Mark Paget' credit='Ella Tomlin'>
        With minimal physical scenery, lighting played a major role in shaping the environment. Deep blues, haze, and diffused 
        floods were used to create a <b>sense of depth,</b> while fixtures mounted lower than the venue's standard rig artificially compressed the 
        playing space; giving certain locations, such as Wilson’s Garage and the speakeasy, <b>a more claustrophobic feel.</b>
        <br/>
        Initially pitched with more elaborate set, collaboration with the set designer (<i>Kira Thomasson</i>) and director (<i>Charles Kellet</i>) 
        led to the development of a simpler and more refined final design - one that played to the strengths of both departments.
      </SVImageSection>

      <SVImageSection label='Glamour vs Decay' src={sec_02} caption='Josh Steele, Ed Wells & Ada Collett' credit='Ella Tomlin'>
        The design had to balance the spectacle of Gatsby’s world with the underlying bleakness of the story. Gatsby’s parties used <b>saturated colour 
        and rhythmic effects,</b> created using an array of side-rigged LED spots, to create a sense of excess and movement. In contrast, scenes 
        set in Myrtle’s apartment, the Valley of Ashes, and the Plaza Hotel favoured dirtier ambers, shadows, and stripped-back compositions.
      </SVImageSection>

      <SVImageSection label='The American Dream' left src={sec_03} caption="Gatsby's Death" credit='Ella Tomlin'>
        Recurring lighting motifs were used throughout the production to reinforce the play’s central themes. <b>The ever-famous green light</b> was positioned behind the audience, a 
        representational fixture of Gatsby’s idealised pursuit of love and the American Dream, while the stark “God Light” (as it was dubbed) - a large flood positioned upstage centre - acted as <b>its thematic opposite; 
        exposing the emptiness beneath that ambition.</b> These elements returned at key moments throughout the show, particularly during the car crash and Gatsby’s death.
      </SVImageSection>

      <SVHr />
      <SVFullCompany s={s} />
    </SVPage>
  )

}