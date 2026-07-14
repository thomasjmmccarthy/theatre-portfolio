import { createSpotlightEntry } from "../../pages/spotlight-viewer/createSpotlightEntry";

import { SVCornerImage } from "../../pages/spotlight-viewer/components/SVCornerImage";
import { SVDescription } from "../../pages/spotlight-viewer/components/SVDescription";
import { SVPage } from "../../pages/spotlight-viewer/components/SVPage";
import { SVTitle } from "../../pages/spotlight-viewer/components/SVTitle";
import { SVTextSection } from "../../pages/spotlight-viewer/components/SVTextSection";
import { SVHr } from "../../pages/spotlight-viewer/components/SVHr";
import { SVImageSection } from "../../pages/spotlight-viewer/components/SVImageSection";
import { SVAnnouncement } from "../../pages/spotlight-viewer/components/SVAnnouncement";
import { SVFullCompany } from "../../pages/spotlight-viewer/components/SVFullCompany";
import { SVCarousel } from "../../pages/spotlight-viewer/components/SVCarousel";

import corner_header from './assets/corner-header.jpg';
import sec_01 from './assets/sec-01.jpeg';
import sec_02 from './assets/sec-02.jpg';
import sec_03 from './assets/sec-03.jpg';
import gallery_01 from './assets/gallery-01.png';
import gallery_02 from './assets/gallery-02.png';
import gallery_03 from './assets/gallery-03.png';


export function BlackMountainSpotlight() {

  const s = createSpotlightEntry('black-mountain');

  const gallery = [
    { src: gallery_01, title: 'Lighting Plan', caption: 'Lighting Plan for Black Mountain at South London Theatre, 10th April 2026' },
    { src: gallery_02, title: 'Reference', caption: 'Reference images, used as a basis for the overall design' },
    { src: gallery_03, title: 'Specials Reference', caption: 'Reference images for each of the location-based specials' },
  ]

  return (
    <SVPage>

      <SVCornerImage src={corner_header} />
      <SVTitle s={s} />
      <SVDescription s={s} />
      <SVHr />

      <SVAnnouncement>'Black Mountain' returns to the stage in October 2026</SVAnnouncement>

      <SVTextSection>
        <i>Black Mountain</i> was my second production at the South London Theatre - an amateur performance venue in West Norwood.
        <br/><br/>
        Working within a stripped-back staging, the production relied on lighting and sound to establish both place and atmosphere. 
        The design blends <b>naturalistic and symbolic details,</b> to reflect the emotional and psychological progression of the 
        story.
      </SVTextSection>

      <SVImageSection label='Location through Lighting' left src={sec_01} caption='Testing the grate light, constructed for the show'>
        With very little physical set, lighting became the primary tool for establishing location. Each setting was shaped through 
        carefully isolated specials, allowing the audience to clearly read shifts in place, without the reliance on large set changes. 
        In several cases, <b>custom elements were constructed</b> to achieve the desired lighting effect(s).
        <br/>
        A liminal atmosphere was achieved through consistent use of <b>side and back lighting.</b> Combined with haze, this softened 
        and obscured the upstage boundary of the stage, creating a recession into darkness that lent the visuals a dark, void-like 
        quality.
      </SVImageSection>

      <SVImageSection label='A Faltering Reality' src={sec_02} credit='Sophie Davies' caption='Gabriel Read & Milka Sholoya'>
        The motion sensor, used in night-time exterior scenes, flickers and breaks more as the play progresses. It is a written 
        reference to the character of Paul’s (<i>Gabriel Read</i>) deteriorating grasp on what is real, and what is the psychological 
        torture inflicted by his wife, Rebecca (<i>Nat Demarchuk</i>).
        <br/>
        Alongside its mentioned appearances, I made the decision to end the play using this same flickering motif, to reinforce the 
        journey the characters went on. This was drafted with the aid of the sound designer (<i>Ben Farnham</i>) and finalised during 
        tech.
      </SVImageSection>

      <SVImageSection label='Collaboration with Sound' left src={sec_03} credit='Sophie Davies' caption='Nat Demarchuk'>
        In my experience, I have found close collaboration between lighting and sound plays an extensive role in building 
        a <b>cohesive cinematic atmosphere</b> on-stage, and <i>Black Mountain</i> was no exception.
        <br/>
        Lighting shifts, transitions, and sequences were developed in close collaboration with the sound designer, in order to 
        ensure that both areas reinforced one another. The most complicated section of design, the production's opening dance number, 
        was programmed using <b>additional pre-vis material</b> provided by the director/choreographer (<i>Kurban Kassam</i>).
        <br/>
        To make the most of the venue's technical facilities, their in-house lighting desk (FLX S-24) was replaced with an ETCnomad, 
        to enable the use of more complex effects, presets, and programming.
      </SVImageSection>

      <SVHr />
      <SVCarousel label="More from 'Black Mountain'" gallery={gallery} />

      <SVHr />

      <SVFullCompany s={s} />

    </SVPage>
  )

}