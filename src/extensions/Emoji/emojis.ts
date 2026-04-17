export interface Character {
  name: string
  char: string
  keywords?: string[] // 建议增加关键词以便搜索
}

export interface EmojiCategory {
  name: string
  title: string
  icon: string
  characters: Character[]
}

// 1. 笑脸与情感 (Smileys & Emotion) - 约 100+
const smileys: Character[] = [
  { name: 'grinning', char: '😀' }, { name: 'grin', char: '😁' }, { name: 'joy', char: '😂' }, { name: 'rofl', char: '🤣' },
  { name: 'smiley', char: '😃' }, { name: 'smile', char: '😄' }, { name: 'sweat_smile', char: '😅' }, { name: 'laughing', char: '😆' },
  { name: 'wink', char: '😉' }, { name: 'blush', char: '😊' }, { name: 'yum', char: '😋' }, { name: 'sunglasses', char: '😎' },
  { name: 'heart_eyes', char: '😍' }, { name: 'kissing_heart', char: '😘' }, { name: 'smiling_face_with_tear', char: '🥲' },
  { name: 'relaxed', char: '☺️' }, { name: 'slight_smile', char: '🙂' }, { name: 'upside_down', char: '🙃' }, { name: 'melting_face', char: '🫠' },
  { name: 'hugging', char: '🤗' }, { name: 'star_eyes', char: '🤩' }, { name: 'thinking', char: '🤔' }, { name: 'raised_eyebrow', char: '🤨' },
  { name: 'neutral_face', char: '😐' }, { name: 'expressionless', char: '😑' }, { name: 'no_mouth', char: '😶' }, { name: 'dotted_line_face', char: '🫥' },
  { name: 'rolling_eyes', char: '🙄' }, { name: 'smirking', char: '😏' }, { name: 'persevering', char: '😣' }, { name: 'disappointed_relieved', char: '😥' },
  { name: 'open_mouth', char: '😮' }, { name: 'zipper_mouth', char: '🤐' }, { name: 'hushed', char: '😯' }, { name: 'sleepy', char: '😪' },
  { name: 'tired_face', char: '😫' }, { name: 'yawning_face', char: '🥱' }, { name: 'sleeping', char: '😴' }, { name: 'relieved', char: '😌' },
  { name: 'nerd', char: '🤓' }, { name: 'stuck_out_tongue', char: '😛' }, { name: 'stuck_out_tongue_winking_eye', char: '😜' },
  { name: 'stuck_out_tongue_closed_eyes', char: '😝' }, { name: 'drooling_face', char: '🤤' }, { name: 'unamused', char: '😒' },
  { name: 'sweat', char: '😓' }, { name: 'pensive', char: '😔' }, { name: 'confused', char: '😕' }, { name: 'worry', char: '😟' },
  { name: 'astonished', char: '😲' }, { name: 'frowning_face', char: '☹️' }, { name: 'confounded', char: '😖' }, { name: 'disappointed', char: '😞' },
  { name: 'triumph', char: '😤' }, { name: 'cry', char: '😢' }, { name: 'sob', char: '😭' }, { name: 'frowning', char: '😦' },
  { name: 'anguished', char: '😧' }, { name: 'fearful', char: '😨' }, { name: 'weary', char: '😩' }, { name: 'exploding_head', char: '🤯' },
  { name: 'grimacing', char: '😬' }, { name: 'cold_sweat', char: '😰' }, { name: 'scream', char: '😱' }, { name: 'flushed', char: '😳' },
  { name: 'zany_face', char: '🤪' }, { name: 'dizzy_face', char: '😵' }, { name: 'pouting', char: '😡' }, { name: 'angry', char: '😠' },
  { name: 'face_with_symbols_on_mouth', char: '🤬' }, { name: 'mask', char: '😷' }, { name: 'thermometer_face', char: '🤒' },
  { name: 'shushing_face', char: '🤫' }, { name: 'saluting_face', char: '🫡' }, { name: 'face_with_peeking_eye', char: '🫣' },
  { name: 'clown_face', char: '🤡' }, { name: 'ghost', char: '👻' }, { name: 'skull', char: '💀' }, { name: 'alien', char: '👽' },
  { name: 'robot', char: '🤖' }, { name: 'poop', char: '💩' }, { name: 'ogre', char: '👹' }, { name: 'goblin', char: '👺' },
  { name: 'monkey_see', char: '🙈' }, { name: 'monkey_hear', char: '🙉' }, { name: 'monkey_speak', char: '🙊' }
]

// 2. 身体与手势 (People & Body) - 约 100+
const people: Character[] = [
  { name: 'wave', char: '👋' }, { name: 'raised_back_of_hand', char: '🤚' }, { name: 'fist', char: '👊' }, { name: 'v_hand', char: '✌️' },
  { name: 'ok_hand', char: '👌' }, { name: 'pinching_hand', char: '🤏' }, { name: 'point_left', char: '👈' }, { name: 'point_right', char: '👉' },
  { name: 'point_up', char: '👆' }, { name: 'point_down', char: '👇' }, { name: 'thumbsup', char: '👍' }, { name: 'thumbsdown', char: '👎' },
  { name: 'clap', char: '👏' }, { name: 'raised_hands', char: '🙌' }, { name: 'open_hands', char: '👐' }, { name: 'pray', char: '🙏' },
  { name: 'flex', char: '💪' }, { name: 'heart_hands', char: '🫶' }, { name: 'handshake', char: '🤝' }, { name: 'writing_hand', char: '✍️' },
  { name: 'nail_polish', char: '💅' }, { name: 'selfie', char: '🤳' }, { name: 'nose', char: '👃' }, { name: 'ear', char: '👂' },
  { name: 'eye', char: '👁️' }, { name: 'tongue', char: '👅' }, { name: 'lips', char: '👄' }, { name: 'kiss', char: '💋' },
  { name: 'boy', char: '👦' }, { name: 'girl', char: '👧' }, { name: 'man', char: '👨' }, { name: 'woman', char: '👩' },
  { name: 'old_man', char: '👴' }, { name: 'old_woman', char: '👵' }, { name: 'baby', char: '👶' }, { name: 'student', char: '🧑‍🎓' },
  { name: 'teacher', char: '🧑‍🏫' }, { name: 'cook', char: '🧑‍🍳' }, { name: 'farmer', char: '🧑‍🌾' }, { name: 'mechanic', char: '🧑‍🔧' },
  { name: 'office_worker', char: '🧑‍💼' }, { name: 'scientist', char: '🧑‍🔬' }, { name: 'technologist', char: '🧑‍💻' }, { name: 'singer', char: '🧑‍🎤' },
  { name: 'artist', char: '🧑‍🎨' }, { name: 'pilot', char: '🧑‍✈️' }, { name: 'astronaut', char: '🧑‍🚀' }, { name: 'firefighter', char: '🧑‍🚒' },
  { name: 'police_officer', char: '👮' }, { name: 'detective', char: '🕵️' }, { name: 'guard', char: '💂' }, { name: 'ninja', char: '🥷' }
]

// 3. 动物与自然 (Animals & Nature) - 约 120+
const animals: Character[] = [
  { name: 'dog', char: '🐶' }, { name: 'cat', char: '🐱' }, { name: 'mouse', char: '🐭' }, { name: 'hamster', char: '🐹' },
  { name: 'rabbit', char: '🐰' }, { name: 'fox', char: '🦊' }, { name: 'bear', char: '🐻' }, { name: 'panda', char: '🐼' },
  { name: 'koala', char: '🐨' }, { name: 'tiger', char: '🐯' }, { name: 'lion', char: '🦁' }, { name: 'cow', char: '🐮' },
  { name: 'pig', char: '🐷' }, { name: 'frog', char: '🐸' }, { name: 'monkey_face', char: '🐵' }, { name: 'gorilla', char: '🦍' },
  { name: 'chicken', char: '🐔' }, { name: 'penguin', char: '🐧' }, { name: 'bird', char: '🐦' }, { name: 'duck', char: '🦆' },
  { name: 'eagle', char: '🦅' }, { name: 'owl', char: '🦉' }, { name: 'bat', char: '🦇' }, { name: 'wolf', char: '🐺' },
  { name: 'horse', char: '🐴' }, { name: 'unicorn', char: '🦄' }, { name: 'bee', char: '🐝' }, { name: 'bug', char: '🐛' },
  { name: 'butterfly', char: '🦋' }, { name: 'snail', char: '🐌' }, { name: 'octopus', char: '🐙' }, { name: 'shell', char: '🐚' },
  { name: 'fish', char: '🐟' }, { name: 'tropical_fish', char: '🐠' }, { name: 'dolphin', char: '🐬' }, { name: 'whale', char: '🐳' },
  { name: 'spider', char: '🕷️' }, { name: 'scorpion', char: '🦂' }, { name: 'snake', char: '🐍' }, { name: 'turtle', char: '🐢' },
  { name: 'cactus', char: '🌵' }, { name: 'evergreen_tree', char: '🌲' }, { name: 'deciduous_tree', char: '🌳' }, { name: 'palm_tree', char: '🌴' },
  { name: 'maple_leaf', char: '🍁' }, { name: 'cherry_blossom', char: '🌸' }, { name: 'rose', char: '🌹' }, { name: 'sunflower', char: '🌻' },
  { name: 'hibiscus', char: '🌺' }, { name: 'tulip', char: '🌷' }, { name: 'blossom', char: '🌼' }, { name: 'clover', char: '🍀' }
]

// 4. 食物与饮料 (Food & Drink) - 约 100+
const food: Character[] = [
  { name: 'apple', char: '🍎' }, { name: 'pear', char: '🍐' }, { name: 'orange', char: '🍊' }, { name: 'lemon', char: '🍋' },
  { name: 'banana', char: '🍌' }, { name: 'watermelon', char: '🍉' }, { name: 'grape', char: '🍇' }, { name: 'strawberry', char: '🍓' },
  { name: 'blueberry', char: '🫐' }, { name: 'melon', char: '🍈' }, { name: 'cherries', char: '🍒' }, { name: 'peach', char: '🍑' },
  { name: 'pineapple', char: '🍍' }, { name: 'coconut', char: '🥥' }, { name: 'kiwi', char: '🥝' }, { name: 'tomato', char: '🍅' },
  { name: 'eggplant', char: '🍆' }, { name: 'avocado', char: '🥑' }, { name: 'broccoli', char: '🥦' }, { name: 'corn', char: '🌽' },
  { name: 'carrot', char: '🥕' }, { name: 'mushroom', char: '🍄' }, { name: 'bread', char: '🍞' }, { name: 'croissant', char: '🥐' },
  { name: 'cheese', char: '🧀' }, { name: 'meat', char: '🍖' }, { name: 'hamburger', char: '🍔' }, { name: 'fries', char: '🍟' },
  { name: 'pizza', char: '🍕' }, { name: 'hotdog', char: '🌭' }, { name: 'taco', char: '🌮' }, { name: 'egg', char: '🥚' },
  { name: 'popcorn', char: '🍿' }, { name: 'icecream', char: '🍦' }, { name: 'doughnut', char: '🍩' }, { name: 'cookie', char: '🍪' },
  { name: 'cake', char: '🍰' }, { name: 'chocolate', char: '🍫' }, { name: 'candy', char: '🍬' }, { name: 'coffee', char: '☕' },
  { name: 'tea', char: '🍵' }, { name: 'bubble_tea', char: '🧋' }, { name: 'beer', char: '🍺' }, { name: 'wine', char: '🍷' }, { name: 'cocktail', char: '🍸' }
]

// 5. 运动与活动 (Activities) - 约 80+
const activities: Character[] = [
  { name: 'soccer', char: '⚽' }, { name: 'basketball', char: '🏀' }, { name: 'football', char: '🏈' }, { name: 'baseball', char: '⚾' },
  { name: 'tennis', char: '🎾' }, { name: 'volleyball', char: '🏐' }, { name: 'ping_pong', char: '🏓' }, { name: 'badminton', char: '🏸' },
  { name: 'boxing', char: '🥊' }, { name: 'skateboarding', char: '🛹' }, { name: 'golf', char: '⛳' }, { name: 'cycling', char: '🚴' },
  { name: 'swimming', char: '🏊' }, { name: 'yoga', char: '🧘' }, { name: 'trophy', char: '🏆' }, { name: 'medal', char: '🏅' },
  { name: 'ticket', char: '🎫' }, { name: 'video_game', char: '🎮' }, { name: 'dice', char: '🎲' }, { name: 'art', char: '🎨' },
  { name: 'clapper', char: '🎬' }, { name: 'music', char: '🎵' }, { name: 'guitar', char: '🎸' }, { name: 'piano', char: '🎹' }
]

// 6. 物品 (Objects) - 约 120+
const objects: Character[] = [
  { name: 'laptop', char: '💻' }, { name: 'desktop', char: '🖥️' }, { name: 'keyboard', char: '⌨️' }, { name: 'phone', char: '📱' },
  { name: 'watch', char: '⌚' }, { name: 'camera', char: '📸' }, { name: 'tv', char: '📺' }, { name: 'light_bulb', char: '💡' },
  { name: 'flashlight', char: '🔦' }, { name: 'moneybag', char: '💰' }, { name: 'credit_card', char: '💳' }, { name: 'gem', char: '💎' },
  { name: 'hammer', char: '🔨' }, { name: 'wrench', char: '🔧' }, { name: 'battery', char: '🔋' }, { name: 'package', char: '📦' },
  { name: 'envelope', char: '✉️' }, { name: 'mailbox', char: '📫' }, { name: 'pencil', char: '✏️' }, { name: 'memo', char: '📝' },
  { name: 'book', char: '📖' }, { name: 'newspaper', char: '📰' }, { name: 'briefcase', char: '💼' }, { name: 'shopping_cart', char: '🛒' },
  { name: 'gift', char: '🎁' }, { name: 'balloon', char: '🎈' }, { name: 'party_popper', char: '🎉' }, { name: 'bed', char: '🛌' },
  { name: 'toilet', char: '🚽' }, { name: 'shower', char: '🚿' }, { name: 'pill', char: '💊' }, { name: 'microscope', char: '🔬' },
  { name: 'telescope', char: '🔭' }, { name: 'toolbox', char: '🧰' }, { name: 'magnet', char: '🧲' }, { name: 'shield', char: '🛡️' }
]

// 7. 旅行与天文 (Travel & Places) - 约 80+
const travel: Character[] = [
  { name: 'car', char: '🚗' }, { name: 'taxi', char: '🚕' }, { name: 'bus', char: '🚌' }, { name: 'train', char: '🚆' },
  { name: 'airplane', char: '✈️' }, { name: 'ship', char: '🚢' }, { name: 'rocket', char: '🚀' }, { name: 'ufo', char: '🛸' },
  { name: 'map', char: '🗺️' }, { name: 'mountain', char: '⛰️' }, { name: 'volcano', char: '🌋' }, { name: 'beach', char: '🏖️' },
  { name: 'stadium', char: '🏟️' }, { name: 'house', char: '🏠' }, { name: 'office', char: '🏢' }, { name: 'school', char: '🏫' },
  { name: 'rainbow', char: '🌈' }, { name: 'sun', char: '☀️' }, { name: 'moon', char: '🌙' }, { name: 'star', char: '⭐' },
  { name: 'cloud', char: '☁️' }, { name: 'rain', char: '🌧️' }, { name: 'thunder', char: '⚡' }, { name: 'fire', char: '🔥' },
  { name: 'snowflake', char: '❄️' }, { name: 'earth_asia', char: '🌏' }, { name: 'earth_america', char: '🌎' }
]

// 8. 符号与标志 (Symbols) - 约 100+
const symbols: Character[] = [
  { name: 'heart', char: '❤️' }, { name: 'orange_heart', char: '🧡' }, { name: 'yellow_heart', char: '💛' }, { name: 'green_heart', char: '💚' },
  { name: 'blue_heart', char: '💙' }, { name: 'purple_heart', char: '💜' }, { name: 'black_heart', char: '🖤' }, { name: 'white_heart', char: '🤍' },
  { name: 'brown_heart', char: '🤎' }, { name: 'broken_heart', char: '💔' }, { name: 'check', char: '✅' }, { name: 'cross', char: '❌' },
  { name: 'warning', char: '⚠️' }, { name: 'stop', char: '🛑' }, { name: 'prohibited', char: '🚫' }, { name: 'search', char: '🔍' },
  { name: 'lock', char: '🔒' }, { name: 'unlock', char: '🔓' }, { name: 'key', char: '🔑' }, { name: 'link', char: '🔗' },
  { name: 'speaker', char: '🔊' }, { name: 'mute', char: '🔇' }, { name: 'bell', char: '🔔' }, { name: 'question', char: '❓' },
  { name: 'exclamation', char: '❗' }, { name: 'infinity', char: '♾️' }, { name: 'recycle', char: '♻️' }, { name: 'radioactive', char: '☢️' },
  { name: 'biohazard', char: '☣️' }, { name: 'peace', char: '☮️' }, { name: 'ying_yang', char: '☯️' }
]

// 9. 旗帜与数学 (Flags & Math) - 约 60+
const flags: Character[] = [
  { name: 'flag_cn', char: '🇨🇳' }, { name: 'flag_us', char: '🇺🇸' }, { name: 'flag_jp', char: '🇯🇵' }, { name: 'flag_kr', char: '🇰🇷' },
  { name: 'flag_gb', char: '🇬🇧' }, { name: 'flag_fr', char: '🇫🇷' }, { name: 'flag_de', char: '🇩🇪' }, { name: 'flag_it', char: '🇮🇹' },
  { name: 'flag_ru', char: '🇷🇺' }, { name: 'plus', char: '➕' }, { name: 'minus', char: '➖' }, { name: 'multiply', char: '✖️' },
  { name: 'divide', char: '➗' }, { name: 'equals', char: '🟰' }, { name: 'percent', char: '🔣' }
]

export const characterCategories: EmojiCategory[] = [
  { name: 'smileys', title: '笑脸表情', icon: '😀', characters: smileys },
  { name: 'people', title: '人物手势', icon: '👋', characters: people },
  { name: 'animals', title: '动物自然', icon: '🐶', characters: animals },
  { name: 'food', title: '食物饮料', icon: '🍔', characters: food },
  { name: 'activities', title: '运动活动', icon: '⚽', characters: activities },
  { name: 'travel', title: '旅行地点', icon: '🚗', characters: travel },
  { name: 'objects', title: '生活物品', icon: '💡', characters: objects },
  { name: 'symbols', title: '符号标志', icon: '❤️', characters: symbols },
  { name: 'flags', title: '旗帜数学', icon: '🚩', characters: flags }
]

// 所有emoji字符
export const allEmojis: Character[] = characterCategories.flatMap(category => category.characters)

// 包含“全部”分类的所有分类
export const allCategories: EmojiCategory[] = [
  {
    name: 'all',
    title: '全部',
    icon: '✨',
    characters: allEmojis,
  },
  ...characterCategories,
]

// 搜索emoji
export function searchEmojis(characters: Character[], searchTerm: string): Character[] {
  if (!searchTerm) return characters
  const term = searchTerm.toLowerCase()
  return characters.filter(char =>
    char.name.toLowerCase().includes(term) ||
    char.char.toLowerCase().includes(term) ||
    (char.keywords && char.keywords.some(k => k.toLowerCase().includes(term)))
  )
}