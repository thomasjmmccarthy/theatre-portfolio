import Productions from '../../data/productions.json';
import Spotlight from '../../data/spotlight.json';

export function createSpotlightEntry(slug) {

  let res;

  Productions.forEach((p) => {
    if(p.slug === slug) {
      res = p;
    }
  })

  Spotlight.forEach((s) => {
    if(s.slug === slug) {
      Object.keys(s).forEach((k) => {
        res[k] = s[k];
      })
    }
  });

  return res;
}