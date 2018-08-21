function stripLatin1Accent (c) {
  switch(c) {
    case '\u00C0':
    case '\u00C1':
    case '\u00C2':
    case '\u00C3':
    case '\u00C4':
    case '\u00C5':
    case '\u00E0':
    case '\u00E1':
    case '\u00E2':
    case '\u00E3':
    case '\u00E4':
    case '\u00E5':
    case '\u0100':
    case '\u0101':
    case '\u0102':
    case '\u0103':
    case '\u0104':
    case '\u0105':
      return 'a'
    case '\u00C7':
    case '\u00E7':
    case '\u0106':
    case '\u0107':
    case '\u0108':
    case '\u0109':
    case '\u010A':
    case '\u010B':
    case '\u010C':
    case '\u010D':
      return 'c'
    case '\u00D0':
    case '\u00F0':
    case '\u010E':
    case '\u010F':
    case '\u0110':
    case '\u0111':
      return 'd'
    case '\u00C8':
    case '\u00C9':
    case '\u00CA':
    case '\u00CB':
    case '\u00E8':
    case '\u00E9':
    case '\u00EA':
    case '\u00EB':
    case '\u0112':
    case '\u0113':
    case '\u0114':
    case '\u0115':
    case '\u0116':
    case '\u0117':
    case '\u0118':
    case '\u0119':
    case '\u011A':
    case '\u011B':
      return 'e'
    case '\u011C':
    case '\u011D':
    case '\u011E':
    case '\u011F':
    case '\u0120':
    case '\u0121':
    case '\u0122':
    case '\u0123':
      return 'g'
    case '\u0124':
    case '\u0125':
    case '\u0126':
    case '\u0127':
      return 'h'
    case '\u00CC':
    case '\u00CD':
    case '\u00CE':
    case '\u00CF':
    case '\u00EC':
    case '\u00ED':
    case '\u00EE':
    case '\u00EF':
    case '\u0128':
    case '\u0129':
    case '\u012A':
    case '\u012B':
    case '\u012C':
    case '\u012D':
    case '\u012E':
    case '\u012F':
    case '\u0130':
    case '\u0131':
      return 'i'
    case '\u0134':
    case '\u0135':
      return 'j'
    case '\u0136':
    case '\u0137':
    case '\u0138':
      return 'k'
    case '\u0139':
    case '\u013A':
    case '\u013B':
    case '\u013C':
    case '\u013D':
    case '\u013E':
    case '\u013F':
    case '\u0140':
    case '\u0141':
    case '\u0142':
      return 'l'
    case '\u00D1':
    case '\u00F1':
    case '\u0143':
    case '\u0144':
    case '\u0145':
    case '\u0146':
    case '\u0147':
    case '\u0148':
    case '\u0149':
    case '\u014A':
    case '\u014B':
      return 'n'
    case '\u00D2':
    case '\u00D3':
    case '\u00D4':
    case '\u00D5':
    case '\u00D6':
    case '\u00D8':
    case '\u00F2':
    case '\u00F3':
    case '\u00F4':
    case '\u00F5':
    case '\u00F6':
    case '\u00F8':
    case '\u014C':
    case '\u014D':
    case '\u014E':
    case '\u014F':
    case '\u0150':
    case '\u0151':
      return 'o'
    case '\u0154':
    case '\u0155':
    case '\u0156':
    case '\u0157':
    case '\u0158':
    case '\u0159':
      return 'r'
    case '\u015A':
    case '\u015B':
    case '\u015C':
    case '\u015D':
    case '\u015E':
    case '\u015F':
    case '\u0160':
    case '\u0161':
    case '\u017F':
      return 's'
    case '\u0162':
    case '\u0163':
    case '\u0164':
    case '\u0165':
    case '\u0166':
    case '\u0167':
      return 't'
    case '\u00D9':
    case '\u00DA':
    case '\u00DB':
    case '\u00DC':
    case '\u00F9':
    case '\u00FA':
    case '\u00FB':
    case '\u00FC':
    case '\u0168':
    case '\u0169':
    case '\u016A':
    case '\u016B':
    case '\u016C':
    case '\u016D':
    case '\u016E':
    case '\u016F':
    case '\u0170':
    case '\u0171':
    case '\u0172':
    case '\u0173':
      return 'u'
    case '\u0174':
    case '\u0175':
      return 'w'
    case '\u00DD':
    case '\u00FD':
    case '\u00FF':
    case '\u0176':
    case '\u0177':
    case '\u0178':
      return 'y'
    case '\u0179':
    case '\u017A':
    case '\u017B':
    case '\u017C':
    case '\u017D':
    case '\u017E':
      return 'z'
    default:
      return c
  }
}

const NonAscii = /[\u0080-\uffff]/g

// Punctuation regex built using http://www.unicode.org/Public/UNIDATA/UnicodeData.txt
const PunctuationControl = /[\x00-\x08\x0A-\x1F\x7F\u0021-\u0023\u0025-\u002a\u002c-\u002f\u003a-\u003b\u003f-\u0040\u005b-\u005d\u005f\u007b\u007d\u00a1\u00a7\u00ab\u00b6-\u00b7\u00bb\u00bf\u037e\u0387\u055a-\u055f\u0589-\u058a\u05be\u05c0\u05c3\u05c6\u05f3-\u05f4\u0609-\u060a\u060c-\u060d\u061b\u061e-\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964-\u0965\u0970\u09fd\u0a76\u0af0\u0c84\u0df4\u0e4f\u0e5a-\u0e5b\u0f04-\u0f12\u0f14\u0f3a-\u0f3d\u0f85\u0fd0-\u0fd4\u0fd9-\u0fda\u104a-\u104f\u10fb\u1360-\u1368\u1400\u166d-\u166e\u169b-\u169c\u16eb-\u16ed\u1735-\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u180a\u1944-\u1945\u1a1e-\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e-\u1c7f\u1cc0-\u1cc7\u1cd3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205e\u207d-\u207e\u208d-\u208e\u2308-\u230b\u2329-\u232a\u2768-\u2775\u27c5-\u27c6\u27e6-\u27ef\u2983-\u2998\u29d8-\u29db\u29fc-\u29fd\u2cf9-\u2cfc\u2cfe-\u2cff\u2d70\u2e00-\u2e2e\u2e30-\u2e4e\u3001-\u3003\u3008-\u3011\u3014-\u301f\u3030\u303d\u30a0\u30fb\ua4fe-\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce-\ua8cf\ua8f8-\ua8fa\ua8fc\ua92e-\ua92f\ua95f\ua9c1-\ua9cd\ua9de-\ua9df\uaa5c-\uaa5f\uaade-\uaadf\uaaf0-\uaaf1\uabeb\ufd3e-\ufd3f\ufe10-\ufe19\ufe30-\ufe52\ufe54-\ufe61\ufe63\ufe68\ufe6a-\ufe6b\uff01-\uff03\uff05-\uff0a\uff0c-\uff0f\uff1a-\uff1b\uff1f-\uff20\uff3b-\uff3d\uff3f\uff5b\uff5d\uff5f-\uff65]+/g

// it really is this easy, because by the time we're searching for whitespace we've already nixed control chars
const Whitespace = /[\x00-\x20]+/g

function doFingerprint (s) {
  s = s.trim()
  s = s.toLowerCase()
  s = s.replace(NonAscii, stripLatin1Accent)
	s = s.replace(PunctuationControl, '')

	const tokens = s.split(Whitespace)
	tokens.sort()

  const uniqueTokens = []
  let lastToken = null
  for (const token of tokens) {
    if (token !== lastToken) {
      uniqueTokens.push(token)
      lastToken = token
    }
  }

	return uniqueTokens.join(' ')
}

export default function fingerprint () {
  return doFingerprint
}
