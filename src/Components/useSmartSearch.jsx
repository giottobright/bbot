// useSmartSearch.js
import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { beerTypes } from './data';

function simplifiedTransliterate(text) {
  const cyrillicToLatin = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
    'я': 'ya'
  };

  return text.toLowerCase().split('').map(char => cyrillicToLatin[char] || char).join('');
}

export function useSmartSearch() {
    const processedData = useMemo(() => {
      return beerTypes.map(item => ({
        ...item,
        processedLabel: simplifiedTransliterate(item.label),
        processedDescription: simplifiedTransliterate(item.description),
      }));
    }, []);
  
    const fuse = useMemo(() => {
      const options = {
        keys: [
          { name: 'processedLabel', weight: 2 },
          { name: 'processedDescription', weight: 1.5 },
          { name: 'transliteratedLabel', weight: 2 }, // Adjusted to match actual field name
          { name: 'transliteratedDescription', weight: 1.5 }, // Adjusted to match actual field name
          { name: 'categories', weight: 1 },
          { name: 'country', weight: 1 }
        ],
        threshold: 0.2,
        minMatchCharLength: 1,
        tokenize: true,
        matchAllTokens: false,
        findAllMatches: true,
        includeScore: true,
        useExtendedSearch: true,
        ignoreLocation: true,
      };
      return new Fuse(processedData, options);
    }, [processedData]);
  
    const smartSearch = (query) => {
      if (!query) return processedData;
      
      const processedQuery = simplifiedTransliterate(query);
      
      const results = fuse.search(processedQuery);
      return results.map(result => result.item);
    };
  
    return smartSearch;
  }