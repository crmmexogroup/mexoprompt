'use strict';

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════

const NEGATIVE_PROMPT = "bad anatomy, extra fingers, deformed hands, deformed limbs, crossed eyes, low resolution, blurry image, watermark, text overlay, logo, duplicate body parts, bad proportions, artifacts, oversaturated colors, plastic skin, cgi appearance, male subject, masculine features, man";

const QUALITY_LEVELS = [
  {id:"basic",    vi:"Cơ bản",        en:"Basic"},
  {id:"detailed", vi:"Chi tiết",       en:"Detailed"},
  {id:"pro",      vi:"Chuyên nghiệp", en:"Professional"},
  {id:"extreme",  vi:"Cực chi tiết",  en:"Extreme Detail"},
];

const QUALITY_KEYWORDS = {
  basic:    "photo realistic,",
  detailed: "highly detailed, realistic skin texture, natural hair strands, depth of field,",
  pro:      "highly detailed, realistic skin texture, natural hair strands, authentic fabric physics, depth of field, cinematic lighting, professional composition,",
  extreme:  "hyperrealistic, extreme detail, realistic skin texture with pores, natural hair strands individually rendered, authentic fabric physics, bokeh depth of field, cinematic lighting, professional composition, realistic color science, realistic exposure, 8k quality,",
};

const DOUYIN_PRESET = {
  ethnicity:"Chinese", makeup:"Douyin", skin:"Fair", skinDetail:"Natural Texture",
  cameraType:"Smartphone", lens:"85mm", lighting:"Soft Window Light",
  shotType:"Portrait", attractiveness:"Douyin Beauty", location:"Cafe", quality:"Ultra Detail",
  hairLength:"long", hairStyle:"straight", hairColor:"Black",
  expression:"Soft Smile", characterType:"Influencer",
};

// ── SECTIONS CONFIG ──────────────────────────────────────────────

const SECTIONS = [

  {
    id:"character", vi:"Nhân vật", en:"Character", icon:"◈",
    type:"visual",
    cats:[
      {
        id:"characterType", vi:"Kiểu nhân vật", en:"Character Type",
        multi:false,
        items:[
          {vi:"Người trẻ (18+)",      en:"Young Adult (18+)",   img:"assets/character/young_adult.jpg",  icon:"◈"},
          {vi:"Sinh viên",             en:"College Style",       img:"assets/character/college.jpg",      icon:"◈"},
          {vi:"Nhân viên văn phòng",   en:"Office Lady",         img:"assets/character/office.jpg",       icon:"◈"},
          {vi:"Người mẫu thời trang",  en:"Fashion Model",       img:"assets/character/model.jpg",        icon:"◈"},
          {vi:"Influencer",            en:"Influencer",          img:"assets/character/influencer.jpg",   icon:"◈"},
          {vi:"Cosplayer",             en:"Cosplayer",           img:"assets/character/cosplayer.jpg",    icon:"◈"},
          {vi:"Idol",                  en:"Idol",                img:"assets/character/idol.jpg",         icon:"◈"},
          {vi:"Quý cô sang trọng",     en:"Luxury Socialite",   img:"assets/character/luxury.jpg",       icon:"◈"},
          {vi:"Cô gái gym",            en:"Gym Girl",            img:"assets/character/gym.jpg",          icon:"◈"},
          {vi:"Gamer girl",            en:"Gamer Girl",          img:"assets/character/gamer.jpg",        icon:"◈"},
          {vi:"Cô gái quán cà phê",    en:"Cafe Girl",           img:"assets/character/cafe_girl.jpg",    icon:"◈"},
          {vi:"Khách du lịch",         en:"Traveler",            img:"assets/character/traveler.jpg",     icon:"◈"},
        ]
      },
      {
        id:"ethnicity", vi:"Dân tộc / Xuất xứ", en:"Ethnicity",
        multi:false,
        items:[
          {vi:"Trung Quốc",   en:"Chinese",        img:"assets/ethnicity/chinese.jpg",      icon:"◉"},
          {vi:"Hàn Quốc",     en:"Korean",         img:"assets/ethnicity/korean.jpg",       icon:"◉"},
          {vi:"Nhật Bản",     en:"Japanese",       img:"assets/ethnicity/japanese.jpg",     icon:"◉"},
          {vi:"Việt Nam",     en:"Vietnamese",     img:"assets/ethnicity/vietnamese.jpg",   icon:"◉"},
          {vi:"Thái Lan",     en:"Thai",           img:"assets/ethnicity/thai.jpg",         icon:"◉"},
          {vi:"Lai Á",        en:"Mixed Asian",    img:"assets/ethnicity/mixed.jpg",        icon:"◉"},
          {vi:"Đông Á",       en:"East Asian",     img:"assets/ethnicity/east_asian.jpg",   icon:"◉"},
          {vi:"Đông Nam Á",   en:"Southeast Asian",img:"assets/ethnicity/sea.jpg",          icon:"◉"},
        ]
      },
      {
        id:"attractiveness", vi:"Mức độ thu hút", en:"Attractiveness",
        multi:false,
        items:[
          {vi:"Dễ thương",         en:"Cute",              img:"assets/attract/cute.jpg",         icon:"★"},
          {vi:"Xinh xắn",          en:"Pretty",            img:"assets/attract/pretty.jpg",       icon:"★"},
          {vi:"Phong cách",        en:"Stylish",           img:"assets/attract/stylish.jpg",      icon:"★"},
          {vi:"Quyến rũ",          en:"Glamorous",         img:"assets/attract/glamorous.jpg",    icon:"★"},
          {vi:"Thời trang cao",    en:"High Fashion",      img:"assets/attract/hifashion.jpg",    icon:"★"},
          {vi:"Phong cách influencer", en:"Influencer Style", img:"assets/attract/influencer.jpg", icon:"★"},
          {vi:"Vẻ đẹp Douyin",     en:"Douyin Beauty",     img:"assets/attract/douyin.jpg",       icon:"★"},
        ]
      },
    ]
  },

  {
    id:"face", vi:"Khuôn mặt", en:"Face & Features", icon:"◎",
    type:"visual",
    cats:[
      {
        id:"faceShape", vi:"Hình dáng khuôn mặt", en:"Face Shape",
        multi:false,
        items:[
          {vi:"Trái xoan",    en:"Oval",          img:"assets/face/oval.jpg",   icon:"◌"},
          {vi:"Trái tim",     en:"Heart",         img:"assets/face/heart.jpg",  icon:"◌"},
          {vi:"Tròn",         en:"Round",         img:"assets/face/round.jpg",  icon:"◌"},
          {vi:"V-Line",       en:"V-Line",        img:"assets/face/vline.jpg",  icon:"◌"},
          {vi:"Baby face",    en:"Soft Baby Face",img:"assets/face/baby.jpg",   icon:"◌"},
          {vi:"Khuôn mẫu",   en:"Model Face",    img:"assets/face/model.jpg",  icon:"◌"},
        ]
      },
      {
        id:"eyes", vi:"Đôi mắt", en:"Eyes",
        multi:false,
        items:[
          {vi:"To",           en:"Large",         img:"assets/eyes/large.jpg",    icon:"◎"},
          {vi:"Hạnh nhân",    en:"Almond",        img:"assets/eyes/almond.jpg",   icon:"◎"},
          {vi:"Lười biếng",   en:"Sleepy",        img:"assets/eyes/sleepy.jpg",   icon:"◎"},
          {vi:"Sắc sảo",      en:"Sharp",         img:"assets/eyes/sharp.jpg",    icon:"◎"},
          {vi:"Mắt mèo",      en:"Cat Eyes",      img:"assets/eyes/cat.jpg",      icon:"◎"},
          {vi:"Trong sáng",   en:"Innocent Eyes", img:"assets/eyes/innocent.jpg", icon:"◎"},
        ]
      },
      {
        id:"expression", vi:"Biểu cảm", en:"Expression",
        multi:false,
        items:[
          {vi:"Cười dễ thương", en:"Cute Smile",  img:"assets/expr/cute_smile.jpg",   icon:"◍"},
          {vi:"Cười nhẹ",       en:"Soft Smile",  img:"assets/expr/soft_smile.jpg",   icon:"◍"},
          {vi:"Nghiêm túc",     en:"Serious",     img:"assets/expr/serious.jpg",      icon:"◍"},
          {vi:"Lạnh lùng",      en:"Cold",        img:"assets/expr/cold.jpg",         icon:"◍"},
          {vi:"Tự tin",         en:"Confident",   img:"assets/expr/confident.jpg",    icon:"◍"},
          {vi:"Nghịch ngợm",    en:"Playful",     img:"assets/expr/playful.jpg",      icon:"◍"},
          {vi:"Ngại ngùng",     en:"Shy",         img:"assets/expr/shy.jpg",          icon:"◍"},
          {vi:"Thanh lịch",     en:"Elegant",     img:"assets/expr/elegant.jpg",      icon:"◍"},
          {vi:"Tự nhiên",       en:"Natural",     img:"assets/expr/natural.jpg",      icon:"◍"},
        ]
      },
      {
        id:"makeup", vi:"Trang điểm", en:"Makeup",
        multi:false,
        items:[
          {vi:"Tự nhiên",      en:"Natural",     img:"assets/makeup/natural.jpg",     icon:"✦"},
          {vi:"Douyin",        en:"Douyin",      img:"assets/makeup/douyin.jpg",      icon:"✦"},
          {vi:"Hàn Quốc",      en:"Korean",      img:"assets/makeup/korean.jpg",      icon:"✦"},
          {vi:"Sang trọng",    en:"Luxury",      img:"assets/makeup/luxury.jpg",      icon:"✦"},
          {vi:"Soft Glam",     en:"Soft Glam",   img:"assets/makeup/softglam.jpg",    icon:"✦"},
          {vi:"Phong cách Idol", en:"Idol Style",img:"assets/makeup/idol.jpg",        icon:"✦"},
        ]
      },
      {
        id:"skin", vi:"Màu da", en:"Skin Tone",
        multi:false,
        items:[
          {vi:"Trắng sứ",     en:"Pale Porcelain", img:"assets/skin/pale.jpg",   icon:"◐"},
          {vi:"Trắng",        en:"Fair",           img:"assets/skin/fair.jpg",   icon:"◐"},
          {vi:"Beige tự nhiên",en:"Natural Beige", img:"assets/skin/beige.jpg",  icon:"◐"},
          {vi:"Ngà ấm",       en:"Warm Ivory",     img:"assets/skin/ivory.jpg",  icon:"◐"},
          {vi:"Mật ong",      en:"Honey",          img:"assets/skin/honey.jpg",  icon:"◐"},
          {vi:"Rám nắng",     en:"Tanned",         img:"assets/skin/tanned.jpg", icon:"◐"},
        ]
      },
      {
        id:"skinDetail", vi:"Chi tiết da", en:"Skin Detail",
        multi:false,
        items:[
          {vi:"Mịn màng",       en:"Smooth",          img:"", icon:"◑"},
          {vi:"Kết cấu tự nhiên",en:"Natural Texture", img:"", icon:"◑"},
          {vi:"Lỗ chân lông",   en:"Visible Pores",   img:"", icon:"◑"},
          {vi:"Tàn nhang",      en:"Freckles",        img:"", icon:"◑"},
          {vi:"Nốt ruồi son",   en:"Beauty Marks",    img:"", icon:"◑"},
        ]
      },
    ]
  },

  {
    id:"hair", vi:"Tóc", en:"Hair", icon:"∿",
    type:"nested",
    nestedCats:[
      {
        id:"hairShort", vi:"Tóc ngắn", en:"Short Hair", icon:"✂",
        items:[
          {vi:"Tóc pixie",    en:"Pixie cut hair",        img:"assets/hair/pixie.jpg",        catId:"hairStyle", enKey:"hairLength:Short"},
          {vi:"Tóc bob",      en:"Bob cut hair",          img:"assets/hair/bob.jpg",          catId:"hairStyle", enKey:"hairLength:Short"},
          {vi:"Tóc ngắn thẳng", en:"Short straight hair", img:"assets/hair/short_straight.jpg",catId:"hairStyle"},
          {vi:"Tóc ngắn xoăn", en:"Short curly hair",    img:"assets/hair/short_curly.jpg",  catId:"hairStyle"},
        ]
      },
      {
        id:"hairMed", vi:"Tóc ngang vai", en:"Shoulder Length Hair", icon:"↕",
        items:[
          {vi:"Tóc vai thẳng",   en:"Shoulder length straight hair", img:"assets/hair/shoulder_straight.jpg", catId:"hairStyle"},
          {vi:"Tóc vai gợn sóng",en:"Shoulder length wavy hair",     img:"assets/hair/shoulder_wavy.jpg",    catId:"hairStyle"},
          {vi:"Tóc vai đuôi ngựa",en:"Shoulder length ponytail",     img:"assets/hair/shoulder_pony.jpg",    catId:"hairStyle"},
        ]
      },
      {
        id:"hairLong", vi:"Tóc dài", en:"Long Hair", icon:"↓",
        items:[
          {vi:"Tóc dài thẳng",       en:"Long straight hair",       img:"assets/hair/long_straight.jpg",  catId:"hairStyle"},
          {vi:"Tóc dài gợn sóng",    en:"Long wavy hair",           img:"assets/hair/long_wavy.jpg",      catId:"hairStyle"},
          {vi:"Tóc dài xoăn",        en:"Long curly hair",          img:"assets/hair/long_curly.jpg",     catId:"hairStyle"},
          {vi:"Tóc dài Hàn Quốc",    en:"Long Korean style hair",   img:"assets/hair/long_korean.jpg",    catId:"hairStyle"},
          {vi:"Tóc dài Douyin",       en:"Long Douyin style hair",   img:"assets/hair/long_douyin.jpg",    catId:"hairStyle"},
          {vi:"Tóc dài đuôi ngựa",   en:"Long ponytail hair",       img:"assets/hair/long_ponytail.jpg",  catId:"hairStyle"},
          {vi:"Tóc dài mái thưa",    en:"Long hair with side bangs", img:"assets/hair/long_bangs.jpg",    catId:"hairStyle"},
        ]
      },
      {
        id:"hairVLong", vi:"Tóc rất dài", en:"Very Long Hair", icon:"⇓",
        items:[
          {vi:"Tóc rất dài thẳng",   en:"Very long straight hair",  img:"assets/hair/vlong_straight.jpg", catId:"hairStyle"},
          {vi:"Tóc rất dài gợn sóng",en:"Very long wavy hair",      img:"assets/hair/vlong_wavy.jpg",     catId:"hairStyle"},
          {vi:"Tóc rất dài bím",     en:"Very long braided hair",   img:"assets/hair/vlong_braids.jpg",   catId:"hairStyle"},
        ]
      },
      {
        id:"hairColor_group", vi:"Màu tóc", en:"Hair Color", icon:"◈",
        items:[
          {vi:"Đen",          en:"Black hair",           img:"assets/haircolor/black.jpg",    catId:"hairColor"},
          {vi:"Nâu",          en:"Brown hair",           img:"assets/haircolor/brown.jpg",    catId:"hairColor"},
          {vi:"Nâu sô-cô-la", en:"Chocolate brown hair",img:"assets/haircolor/chocolate.jpg",catId:"hairColor"},
          {vi:"Nâu tro",      en:"Ash brown hair",       img:"assets/haircolor/ash_brown.jpg",catId:"hairColor"},
          {vi:"Vàng",         en:"Blonde hair",          img:"assets/haircolor/blonde.jpg",   catId:"hairColor"},
          {vi:"Bạch kim",     en:"Platinum blonde hair", img:"assets/haircolor/platinum.jpg", catId:"hairColor"},
          {vi:"Bạc",          en:"Silver hair",          img:"assets/haircolor/silver.jpg",   catId:"hairColor"},
          {vi:"Hồng",         en:"Pink hair",            img:"assets/haircolor/pink.jpg",     catId:"hairColor"},
          {vi:"Tím",          en:"Purple hair",          img:"assets/haircolor/purple.jpg",   catId:"hairColor"},
          {vi:"Xanh dương",   en:"Blue hair",            img:"assets/haircolor/blue.jpg",     catId:"hairColor"},
          {vi:"Đỏ",           en:"Red hair",             img:"assets/haircolor/red.jpg",      catId:"hairColor"},
        ]
      },
    ]
  },

  {
    id:"body", vi:"Cơ thể", en:"Body", icon:"◆",
    type:"visual",
    cats:[
      {
        id:"bodyType", vi:"Dáng người", en:"Body Type",
        multi:false,
        items:[
          {vi:"Mảnh khảnh", en:"Petite",        img:"assets/body/petite.jpg",   icon:"◆"},
          {vi:"Thon gọn",   en:"Slim",          img:"assets/body/slim.jpg",     icon:"◆"},
          {vi:"Thể thao",   en:"Athletic",      img:"assets/body/athletic.jpg", icon:"◆"},
          {vi:"Đồng hồ cát",en:"Curvy",         img:"assets/body/curvy.jpg",    icon:"◆"},
          {vi:"Người mẫu",  en:"Fashion Model", img:"assets/body/model.jpg",    icon:"◆"},
          {vi:"Đầy đặn",    en:"Voluptuous",    img:"assets/body/voluptuous.jpg",icon:"◆"},
        ]
      },
      {
        id:"bust", vi:"Vòng 1", en:"Bust",
        multi:false,
        items:[
          {vi:"Nhỏ",   en:"Small bust",  img:"", icon:"◇"},
          {vi:"Vừa",   en:"Medium bust", img:"", icon:"◇"},
          {vi:"Đầy",   en:"Full bust",   img:"", icon:"◇"},
          {vi:"Lớn",   en:"Large bust",  img:"", icon:"◇"},
        ]
      },
      {
        id:"hips", vi:"Hông", en:"Hips",
        multi:false,
        items:[
          {vi:"Hẹp",       en:"Narrow hips",   img:"", icon:"◁"},
          {vi:"Cân đối",   en:"Balanced hips", img:"", icon:"◁"},
          {vi:"Rộng",      en:"Wide hips",     img:"", icon:"◁"},
        ]
      },
      {
        id:"thighs", vi:"Đùi", en:"Thighs",
        multi:false,
        items:[
          {vi:"Thon",     en:"Slim thighs",  img:"", icon:"▷"},
          {vi:"Mềm mại",  en:"Soft thighs",  img:"", icon:"▷"},
          {vi:"Đầy đặn",  en:"Thick thighs", img:"", icon:"▷"},
        ]
      },
      {
        id:"legLength", vi:"Chiều dài chân", en:"Leg Length",
        multi:false,
        items:[
          {vi:"Trung bình", en:"Average legs",      img:"", icon:"▽"},
          {vi:"Dài",        en:"Long legs",         img:"", icon:"▽"},
          {vi:"Chân mẫu",   en:"Model length legs", img:"", icon:"▽"},
        ]
      },
    ]
  },

  {
    id:"outfit", vi:"Trang phục", en:"Clothing", icon:"✿",
    type:"nested",
    nestedCats:[
      {
        id:"outfit_bikini", vi:"Bikini", en:"Bikini", icon:"◈",
        items:[
          {vi:"Bikini tam giác",    en:"Triangle bikini",    img:"assets/outfit/bikini_triangle.jpg",  catId:"clothing"},
          {vi:"Bikini dây",         en:"String bikini",      img:"assets/outfit/bikini_string.jpg",    catId:"clothing"},
          {vi:"Bikini cổ yếm",      en:"Halter bikini",      img:"assets/outfit/bikini_halter.jpg",    catId:"clothing"},
          {vi:"Bikini bandeau",     en:"Bandeau bikini",     img:"assets/outfit/bikini_bandeau.jpg",   catId:"clothing"},
          {vi:"Bikini cạp cao",     en:"High waist bikini",  img:"assets/outfit/bikini_highwaist.jpg", catId:"clothing"},
          {vi:"Bikini thể thao",    en:"Sport bikini",       img:"assets/outfit/bikini_sport.jpg",     catId:"clothing"},
          {vi:"Bikini Brazilian",   en:"Brazilian bikini",   img:"assets/outfit/bikini_brazilian.jpg", catId:"clothing"},
        ]
      },
      {
        id:"outfit_dress", vi:"Váy đầm", en:"Dress", icon:"◈",
        items:[
          {vi:"Váy mini",       en:"Mini dress",        img:"assets/outfit/dress_mini.jpg",    catId:"clothing"},
          {vi:"Váy dài",        en:"Maxi dress",        img:"assets/outfit/dress_maxi.jpg",    catId:"clothing"},
          {vi:"Váy cocktail",   en:"Cocktail dress",    img:"assets/outfit/dress_cocktail.jpg",catId:"clothing"},
          {vi:"Váy sang trọng", en:"Elegant dress",     img:"assets/outfit/dress_elegant.jpg", catId:"clothing"},
          {vi:"Váy Hàn Quốc",   en:"Korean style dress",img:"assets/outfit/dress_korean.jpg",  catId:"clothing"},
          {vi:"Váy cổ phục",    en:"Hanfu style dress", img:"assets/outfit/dress_hanfu.jpg",   catId:"clothing"},
        ]
      },
      {
        id:"outfit_casual", vi:"Casual / Đường phố", en:"Casual & Streetwear", icon:"◈",
        items:[
          {vi:"Thường ngày",   en:"Casual outfit",      img:"assets/outfit/casual.jpg",     catId:"clothing"},
          {vi:"Streetwear",    en:"Streetwear outfit",  img:"assets/outfit/streetwear.jpg", catId:"clothing"},
          {vi:"Cà phê",        en:"Cafe outfit",        img:"assets/outfit/cafe.jpg",       catId:"clothing"},
          {vi:"Mùa hè",        en:"Summer outfit",      img:"assets/outfit/summer.jpg",     catId:"clothing"},
          {vi:"Áo hoodie",     en:"Hoodie outfit",      img:"assets/outfit/hoodie.jpg",     catId:"clothing"},
          {vi:"Jeans style",   en:"Denim jeans outfit", img:"assets/outfit/jeans.jpg",      catId:"clothing"},
        ]
      },
      {
        id:"outfit_office", vi:"Công sở & Sang trọng", en:"Office & Luxury", icon:"◈",
        items:[
          {vi:"Thời trang văn phòng", en:"Office fashion outfit",  img:"assets/outfit/office.jpg",   catId:"clothing"},
          {vi:"Thời trang xa xỉ",    en:"Luxury fashion outfit",  img:"assets/outfit/luxury.jpg",   catId:"clothing"},
          {vi:"Áo vest thanh lịch",  en:"Elegant suit outfit",    img:"assets/outfit/suit.jpg",     catId:"clothing"},
        ]
      },
      {
        id:"outfit_sport", vi:"Thể thao & Gym", en:"Sportswear & Gym", icon:"◈",
        items:[
          {vi:"Đồ thể thao",   en:"Sportswear outfit",  img:"assets/outfit/sport.jpg",  catId:"clothing"},
          {vi:"Đồ gym",        en:"Gym wear outfit",    img:"assets/outfit/gym.jpg",    catId:"clothing"},
          {vi:"Yoga wear",     en:"Yoga wear outfit",   img:"assets/outfit/yoga.jpg",   catId:"clothing"},
        ]
      },
      {
        id:"outfit_special", vi:"Đặc biệt", en:"Special", icon:"◈",
        items:[
          {vi:"Cosplay",       en:"Cosplay outfit",     img:"assets/outfit/cosplay.jpg",    catId:"clothing"},
          {vi:"Đồ ngủ",        en:"Loungewear outfit",  img:"assets/outfit/loungewear.jpg", catId:"clothing"},
          {vi:"Áo kimono",     en:"Kimono style outfit",img:"assets/outfit/kimono.jpg",     catId:"clothing"},
        ]
      },
      {
        id:"outfit_fabric", vi:"Chất liệu", en:"Fabric", icon:"◈",
        items:[
          {vi:"Cotton",  en:"cotton fabric",  img:"", catId:"fabric"},
          {vi:"Lụa",     en:"silk fabric",    img:"", catId:"fabric"},
          {vi:"Satin",   en:"satin fabric",   img:"", catId:"fabric"},
          {vi:"Lanh",    en:"linen fabric",   img:"", catId:"fabric"},
          {vi:"Len",     en:"knit fabric",    img:"", catId:"fabric"},
          {vi:"Denim",   en:"denim fabric",   img:"", catId:"fabric"},
          {vi:"Da",      en:"leather fabric", img:"", catId:"fabric"},
          {vi:"Nhung",   en:"velvet fabric",  img:"", catId:"fabric"},
        ]
      },
    ]
  },

  {
    id:"pose", vi:"Tư thế", en:"Pose Library", icon:"⟁",
    type:"nested",
    nestedCats:[
      {
        id:"pose_selfie", vi:"Selfie", en:"Selfie Poses", icon:"📱",
        items:[
          {vi:"Selfie gương",       en:"Mirror selfie pose",          img:"assets/pose/selfie_mirror.jpg",   catId:"pose"},
          {vi:"Selfie thang máy",   en:"Elevator selfie pose",        img:"assets/pose/selfie_elevator.jpg", catId:"pose"},
          {vi:"Selfie gym",         en:"Gym mirror selfie pose",      img:"assets/pose/selfie_gym.jpg",      catId:"pose"},
          {vi:"Selfie phòng tắm",   en:"Bathroom mirror selfie pose", img:"assets/pose/selfie_bathroom.jpg", catId:"pose"},
          {vi:"Selfie xe hơi",      en:"Car selfie pose",             img:"assets/pose/selfie_car.jpg",      catId:"pose"},
          {vi:"Selfie quán cà phê", en:"Cafe selfie pose",            img:"assets/pose/selfie_cafe.jpg",     catId:"pose"},
        ]
      },
      {
        id:"pose_standing", vi:"Đứng", en:"Standing Poses", icon:"◈",
        items:[
          {vi:"Nhìn thẳng",         en:"Front facing pose",          img:"assets/pose/stand_front.jpg",    catId:"pose"},
          {vi:"Góc ba phần tư",     en:"Three quarter pose",         img:"assets/pose/stand_3q.jpg",       catId:"pose"},
          {vi:"Nhìn lại",           en:"Looking back pose",          img:"assets/pose/stand_back.jpg",     catId:"pose"},
          {vi:"Đang đi",            en:"Walking pose",               img:"assets/pose/stand_walking.jpg",  catId:"pose"},
          {vi:"Nhìn sang bên",      en:"Side view pose",             img:"assets/pose/stand_side.jpg",     catId:"pose"},
        ]
      },
      {
        id:"pose_sitting", vi:"Ngồi", en:"Sitting Poses", icon:"◈",
        items:[
          {vi:"Ngồi ghế",      en:"Sitting on chair pose",  img:"assets/pose/sit_chair.jpg", catId:"pose"},
          {vi:"Ngồi sofa",     en:"Sitting on sofa pose",   img:"assets/pose/sit_sofa.jpg",  catId:"pose"},
          {vi:"Ngồi cà phê",   en:"Cafe sitting pose",      img:"assets/pose/sit_cafe.jpg",  catId:"pose"},
          {vi:"Ngồi sàn",      en:"Sitting on floor pose",  img:"assets/pose/sit_floor.jpg", catId:"pose"},
        ]
      },
      {
        id:"pose_lifestyle", vi:"Lifestyle", en:"Lifestyle Poses", icon:"◈",
        items:[
          {vi:"Đọc sách",           en:"Reading book pose",          img:"assets/pose/life_reading.jpg",   catId:"pose"},
          {vi:"Mua sắm",            en:"Shopping pose",              img:"assets/pose/life_shopping.jpg",  catId:"pose"},
          {vi:"Dùng điện thoại",    en:"Using phone pose",           img:"assets/pose/life_phone.jpg",     catId:"pose"},
          {vi:"Uống cà phê",        en:"Drinking coffee pose",       img:"assets/pose/life_coffee.jpg",    catId:"pose"},
          {vi:"Nhìn ra cửa sổ",     en:"Looking out window pose",    img:"assets/pose/life_window.jpg",    catId:"pose"},
        ]
      },
    ]
  },

  {
    id:"scene", vi:"Bối cảnh", en:"Scene & Location", icon:"⌾",
    type:"nested",
    nestedCats:[
      {
        id:"loc_indoor", vi:"Trong nhà", en:"Indoor Locations", icon:"🏠",
        items:[
          {vi:"Quán cà phê",  en:"Cafe setting",       img:"assets/loc/cafe.jpg",      catId:"location"},
          {vi:"Căn hộ",       en:"Apartment setting",  img:"assets/loc/apartment.jpg", catId:"location"},
          {vi:"Khách sạn",    en:"Hotel setting",      img:"assets/loc/hotel.jpg",     catId:"location"},
          {vi:"Hiệu sách",    en:"Bookstore setting",  img:"assets/loc/bookstore.jpg", catId:"location"},
        ]
      },
      {
        id:"loc_urban", vi:"Thành phố", en:"Urban Locations", icon:"🏙",
        items:[
          {vi:"Phố Trung Hoa",  en:"Chinese City Street setting", img:"assets/loc/chinastreet.jpg", catId:"location"},
          {vi:"Trên sân thượng",en:"Rooftop setting",             img:"assets/loc/rooftop.jpg",     catId:"location"},
          {vi:"Trung tâm thương mại cao cấp", en:"Luxury Mall setting", img:"assets/loc/luxmall.jpg", catId:"location"},
          {vi:"Trung tâm thành phố",en:"Downtown setting",        img:"assets/loc/downtown.jpg",    catId:"location"},
        ]
      },
      {
        id:"loc_nature", vi:"Thiên nhiên", en:"Nature Locations", icon:"🌿",
        items:[
          {vi:"Bãi biển", en:"Beach setting",    img:"assets/loc/beach.jpg",  catId:"location"},
          {vi:"Công viên", en:"Park setting",    img:"assets/loc/park.jpg",   catId:"location"},
          {vi:"Rừng",     en:"Forest setting",   img:"assets/loc/forest.jpg", catId:"location"},
          {vi:"Núi",      en:"Mountain setting", img:"assets/loc/mountain.jpg",catId:"location"},
        ]
      },
      {
        id:"lighting_group", vi:"Ánh sáng", en:"Lighting", icon:"☀",
        items:[
          {vi:"Ánh sáng tự nhiên", en:"Natural Light",       img:"assets/light/natural.jpg",   catId:"lighting"},
          {vi:"Giờ vàng",          en:"Golden Hour",         img:"assets/light/golden.jpg",    catId:"lighting"},
          {vi:"Ánh cửa sổ mềm",    en:"Soft Window Light",  img:"assets/light/window.jpg",    catId:"lighting"},
          {vi:"Studio Softbox",    en:"Studio Softbox",      img:"assets/light/softbox.jpg",   catId:"lighting"},
          {vi:"Neon",              en:"Neon lighting",       img:"assets/light/neon.jpg",       catId:"lighting"},
          {vi:"Phố đêm",           en:"Night Street",        img:"assets/light/night.jpg",     catId:"lighting"},
          {vi:"Ánh đèn cà phê",    en:"Cafe Light",          img:"assets/light/cafe.jpg",      catId:"lighting"},
        ]
      },
    ]
  },

  {
    id:"camera", vi:"Máy ảnh", en:"Camera", icon:"⌖",
    type:"camera",
    cats:[
      {
        id:"cameraType", vi:"Loại máy", en:"Camera Type",
        multi:false,
        items:[
          {vi:"Điện thoại thông minh", en:"Smartphone",  img:"assets/cam/smartphone.jpg", icon:"⌖", desc:"Chụp tự nhiên, cảm giác authentic, phong cách social media"},
          {vi:"Máy DSLR",              en:"DSLR",         img:"assets/cam/dslr.jpg",       icon:"⌖", desc:"Chất lượng cao, kiểm soát sâu, phù hợp studio và ngoài trời"},
          {vi:"Máy Mirrorless",        en:"Mirrorless",   img:"assets/cam/mirrorless.jpg", icon:"⌖", desc:"Nhỏ gọn, hiện đại, chất lượng tương đương DSLR"},
        ]
      },
      {
        id:"shotType", vi:"Loại cảnh quay", en:"Shot Type",
        multi:false,
        items:[
          {vi:"Toàn thân",    en:"Full Body shot",       img:"", icon:"⊡"},
          {vi:"Nửa người",    en:"Half Body shot",       img:"", icon:"⊡"},
          {vi:"Chân dung",    en:"Portrait shot",        img:"", icon:"⊡"},
          {vi:"Cận cảnh",     en:"Close-Up shot",        img:"", icon:"⊡"},
          {vi:"Cực cận",      en:"Extreme Close-Up shot",img:"", icon:"⊡"},
        ]
      },
    ],
    lensOptions:[
      {mm:"24", vi:"Góc rộng",   en:"Wide Angle",    use:"Phong cảnh, nhóm",    fovH:100},
      {mm:"35", vi:"Phổ thông",  en:"Standard Wide", use:"Đường phố, lifestyle", fovH:80},
      {mm:"50", vi:"Tự nhiên",   en:"Normal",        use:"Chân dung tự nhiên",  fovH:60},
      {mm:"85", vi:"Chân dung",  en:"Portrait",      use:"Xóa phông đẹp, chuẩn", fovH:35},
      {mm:"135",vi:"Tele chân dung", en:"Telephoto Portrait", use:"Nén không gian, sang trọng", fovH:20},
    ]
  },

  {
    id:"quality_section", vi:"Chất lượng", en:"Quality", icon:"★",
    type:"chips",
    cats:[
      {
        id:"quality", vi:"Mức chi tiết ảnh", en:"Detail Quality",
        multi:false,
        items:[
          {vi:"Chi tiết cao",    en:"High Detail",    img:"", icon:"◈"},
          {vi:"Siêu chi tiết",   en:"Ultra Detail",   img:"", icon:"◈"},
          {vi:"Cực chi tiết",    en:"Extreme Detail", img:"", icon:"◈"},
        ]
      }
    ]
  },
];

// ═══════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════

let state = {
  selections: {},    // catId -> enValue string
  qualityLevel: "detailed",
  douyinMode: false,
  activeTab: "Universal",
  lockedCats: {},    // catId -> true
  favorites: [],     // [{catId, en, vi, img}]
  history: [],       // [{prompt, ts}]
  activePanel: null, // 'favorites'|'history'|null
  collapsedGroups: {},
  openNestedCats: {},
};

// ═══════════════════════════════════════════════════════════════
// STORAGE
// ═══════════════════════════════════════════════════════════════

function loadStorage(){
  try {
    const favs = localStorage.getItem('mexo_favs');
    if(favs) state.favorites = JSON.parse(favs);
    const hist = localStorage.getItem('mexo_history');
    if(hist) state.history = JSON.parse(hist);
  } catch(e){}
}

function saveStorage(){
  try {
    localStorage.setItem('mexo_favs', JSON.stringify(state.favorites));
    localStorage.setItem('mexo_history', JSON.stringify(state.history));
  } catch(e){}
}

// ═══════════════════════════════════════════════════════════════
// PROMPT BUILDER
// ═══════════════════════════════════════════════════════════════

function buildPrompt(){
  const s = state.selections;
  const parts = [];
  if(state.douyinMode) parts.push("Douyin aesthetic, Chinese social media style,");
  if(s.characterType) parts.push(s.characterType + " female character,");
  if(s.ethnicity) parts.push(s.ethnicity + " ethnicity,");
  if(s.attractiveness) parts.push(s.attractiveness + " appearance,");
  // Face
  const face=[];
  if(s.faceShape) face.push(s.faceShape + " face shape");
  if(s.eyes) face.push(s.eyes + " eyes");
  if(s.expression) face.push(s.expression + " expression");
  if(s.makeup) face.push(s.makeup + " makeup");
  if(s.skin) face.push(s.skin + " skin");
  if(s.skinDetail) face.push(s.skinDetail);
  if(face.length) parts.push(face.join(", ")+",");
  // Hair
  const hairStyle = s.hairStyle || "";
  const hairColor = s.hairColor || "";
  if(hairStyle||hairColor) parts.push([hairStyle, hairColor].filter(Boolean).join(", ")+",");
  // Body
  const body=[];
  if(s.bodyType) body.push(s.bodyType + " body type");
  if(s.bust) body.push(s.bust);
  if(s.hips) body.push(s.hips);
  if(s.thighs) body.push(s.thighs);
  if(s.legLength) body.push(s.legLength);
  if(body.length) parts.push(body.join(", ")+",");
  // Clothing
  const cloth=[];
  if(s.clothing) cloth.push(s.clothing);
  if(s.fabric) cloth.push(s.fabric);
  if(cloth.length) parts.push(cloth.join(", ")+",");
  // Pose
  if(s.pose) parts.push(s.pose+",");
  // Scene
  if(s.location) parts.push(s.location+",");
  if(s.lighting) parts.push(s.lighting+",");
  // Camera
  const cam=[];
  if(s.cameraType) cam.push(s.cameraType + " camera");
  if(s.lens) cam.push(s.lens + " lens");
  if(s.shotType) cam.push(s.shotType);
  if(cam.length) parts.push(cam.join(", ")+",");
  // Quality
  parts.push(QUALITY_KEYWORDS[state.qualityLevel]||QUALITY_KEYWORDS.detailed);
  if(s.quality) parts.push(s.quality+",");
  parts.push("beautiful female subject only, no male subjects,");
  return parts.join(" ").replace(/,\s*,/g,",").replace(/\s+/g," ").trim();
}

function formatForModel(prompt, model){
  if(model==="GPT Image") return "A photorealistic image of: "+prompt+"\n\nStyle: Photographic, high quality, professional photography";
  if(model==="Grok") return "--ar 2:3 --style raw --v 6\n"+prompt;
  if(model==="Banana/Flux") return prompt+"\n\nsteps: 30, cfg: 7, sampler: dpmpp_2m";
  return prompt;
}

function getTabContent(){
  if(state.activeTab==="Negative") return NEGATIVE_PROMPT;
  const p = buildPrompt();
  if(state.activeTab==="Universal") return p;
  return formatForModel(p, state.activeTab);
}

// ═══════════════════════════════════════════════════════════════
// ACTIONS
// ═══════════════════════════════════════════════════════════════

function setSelection(catId, enVal){
  if(state.lockedCats[catId]) return;
  if(state.selections[catId]===enVal) delete state.selections[catId];
  else state.selections[catId]=enVal;
  render();
}

function toggleDouyin(){
  state.douyinMode = !state.douyinMode;
  if(state.douyinMode){
    Object.entries(DOUYIN_PRESET).forEach(([k,v])=>{ state.selections[k]=v; });
    showToast("✦ Chế độ Douyin Beauty đã bật");
  } else {
    showToast("Đã tắt chế độ Douyin");
  }
  render();
}

function setQuality(id){ state.qualityLevel=id; render(); }
function setTab(t){ state.activeTab=t; renderOutput(); }

function toggleLock(catId){
  state.lockedCats[catId] = !state.lockedCats[catId];
  render();
  showToast(state.lockedCats[catId]?"🔒 Đã khóa: "+catId : "🔓 Đã mở khóa");
}

function toggleFav(catId, enVal, viVal, img){
  const idx = state.favorites.findIndex(f=>f.catId===catId&&f.en===enVal);
  if(idx>=0) state.favorites.splice(idx,1);
  else state.favorites.push({catId,en:enVal,vi:viVal,img});
  saveStorage();
  render();
  showToast(idx>=0?"Đã xóa khỏi yêu thích":"★ Đã thêm yêu thích");
}

function isFav(catId, enVal){
  return state.favorites.some(f=>f.catId===catId&&f.en===enVal);
}

function clearAll(){
  state.selections={};
  state.douyinMode=false;
  render();
  showToast("Đã xóa tất cả");
}

function randomizeAll(){ _randomize(null); }
function randomizeFace(){ _randomize(["characterType","ethnicity","attractiveness","faceShape","eyes","expression","makeup","skin","skinDetail"]); }
function randomizeOutfit(){ _randomize(["clothing","fabric"]); }
function randomizeScene(){ _randomize(["location","lighting","pose"]); }

function _randomize(catIds){
  SECTIONS.forEach(sec=>{
    const allCats = sec.cats||[];
    const allNested = (sec.nestedCats||[]).flatMap(nc=>nc.items);
    [...allCats].forEach(cat=>{
      if(catIds&&!catIds.includes(cat.id)) return;
      if(state.lockedCats[cat.id]) return;
      if(cat.items&&cat.items.length){
        const item = pickRandom(cat.items);
        state.selections[cat.id] = item.en;
      }
    });
    if(sec.lensOptions&&(!catIds||catIds.includes("lens"))){
      if(!state.lockedCats["lens"]){
        state.selections["lens"] = pickRandom(sec.lensOptions).mm+"mm";
      }
    }
    (sec.nestedCats||[]).forEach(nc=>{
      if(!nc.items||!nc.items.length) return;
      const firstItem = nc.items[0];
      const targetCat = firstItem.catId;
      if(!targetCat) return;
      if(catIds&&!catIds.includes(targetCat)) return;
      if(state.lockedCats[targetCat]) return;
      const item = pickRandom(nc.items);
      state.selections[targetCat] = item.en;
    });
  });
  render();
  showToast("⚄ Đã ngẫu nhiên!");
}

function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function toggleGroup(id){
  state.collapsedGroups[id] = !state.collapsedGroups[id];
  const body = document.getElementById("sgbody-"+id);
  const chev = document.getElementById("sgchev-"+id);
  const selEl= document.getElementById("sgsel-"+id);
  if(body){body.classList.toggle("collapsed", !!state.collapsedGroups[id]);}
  if(chev){chev.classList.toggle("open", !state.collapsedGroups[id]);}
}

function toggleNestedCat(id){
  state.openNestedCats[id] = !state.openNestedCats[id];
  const sub = document.getElementById("ncsub-"+id);
  const arr = document.getElementById("ncarr-"+id);
  const hdr = document.getElementById("nchdr-"+id);
  if(sub){sub.classList.toggle("open", !!state.openNestedCats[id]);}
  if(arr){arr.classList.toggle("open", !!state.openNestedCats[id]);}
  if(hdr){hdr.classList.toggle("active", !!state.openNestedCats[id]);}
}

function saveToHistory(){
  const p = buildPrompt();
  if(!p||p.includes("Chọn")) return;
  state.history.unshift({prompt:p, ts:Date.now()});
  if(state.history.length>50) state.history.pop();
  saveStorage();
  updateHistoryCount();
  showToast("◷ Đã lưu lịch sử");
}

function showPanel(name){
  if(state.activePanel===name){ closePanel(); return; }
  state.activePanel=name;
  const layout=document.querySelector(".layout");
  const panel=document.getElementById("rightPanel");
  const title=document.getElementById("rightPanelTitle");
  const body=document.getElementById("rightPanelBody");
  layout.classList.add("panel-open");
  panel.style.display="flex";
  if(name==="favorites"){
    title.textContent="★ Yêu thích";
    body.innerHTML = renderFavoritesPanel();
  } else {
    title.textContent="◷ Lịch sử Prompt";
    body.innerHTML = renderHistoryPanel();
  }
  // nav highlights
  document.querySelectorAll(".nav-item").forEach(n=>n.classList.remove("active"));
}

function closePanel(){
  state.activePanel=null;
  document.querySelector(".layout").classList.remove("panel-open");
  document.getElementById("rightPanel").style.display="none";
}

function renderFavoritesPanel(){
  if(!state.favorites.length) return '<div style="padding:20px;color:var(--text3);font-size:11px;text-align:center">Chưa có mục yêu thích nào<br><br>Nhấn ★ trên thẻ để thêm</div>';
  return state.favorites.map((f,i)=>`
    <div class="fav-item">
      <div class="fav-item-img">${f.img?`<img src="${f.img}" onerror="this.style.display='none'" alt="">`:'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:16px;opacity:.2">◈</div>'}</div>
      <div class="fav-item-info">
        <div class="fav-item-name">${f.vi}</div>
        <div class="fav-item-cat">${f.catId}</div>
      </div>
      <button class="btn btn-xs" onclick="setSelection('${f.catId}','${esc(f.en)}');render()">+</button>
      <span class="fav-remove" onclick="toggleFav('${f.catId}','${esc(f.en)}','${esc(f.vi)}','${f.img||''}')">✕</span>
    </div>
  `).join("");
}

function renderHistoryPanel(){
  if(!state.history.length) return '<div style="padding:20px;color:var(--text3);font-size:11px;text-align:center">Chưa có lịch sử<br><br>Nhấn "Lưu lịch sử" để lưu</div>';
  return state.history.map((h,i)=>`
    <div class="history-item">
      <div class="history-time">${new Date(h.ts).toLocaleString('vi-VN')}</div>
      <div class="history-preview">${h.prompt}</div>
      <div class="history-actions">
        <button class="btn btn-xs btn-gold" onclick="copyText('${esc(h.prompt)}')">⎘ Sao chép</button>
        <button class="btn btn-xs btn-danger" onclick="deleteHistory(${i})">✕</button>
      </div>
    </div>
  `).join("");
}

function deleteHistory(i){
  state.history.splice(i,1);
  saveStorage();
  document.getElementById("rightPanelBody").innerHTML = renderHistoryPanel();
  updateHistoryCount();
}

// ═══════════════════════════════════════════════════════════════
// SEARCH
// ═══════════════════════════════════════════════════════════════

let searchTimeout = null;

function handleSearch(val){
  clearTimeout(searchTimeout);
  const clr = document.getElementById("searchClear");
  if(clr) clr.style.display = val ? "block" : "none";
  searchTimeout = setTimeout(()=> doSearch(val), 150);
}

function clearSearch(){
  const inp = document.getElementById("globalSearch");
  if(inp) inp.value="";
  doSearch("");
  const clr = document.getElementById("searchClear");
  if(clr) clr.style.display="none";
}

function doSearch(q){
  const sr=document.getElementById("searchResults");
  const mc=document.getElementById("mainArea");
  const grid=document.getElementById("searchGrid");
  const cnt=document.getElementById("searchCount");
  if(!q||q.trim().length<2){
    if(sr) sr.style.display="none";
    // show sections
    document.getElementById("sectionsContainer").style.display="";
    document.querySelector(".douyin-banner").style.display="";
    document.querySelector(".quality-section").style.display="";
    return;
  }
  q=q.toLowerCase();
  const results=[];
  SECTIONS.forEach(sec=>{
    (sec.cats||[]).forEach(cat=>{
      (cat.items||[]).forEach(item=>{
        if(item.vi.toLowerCase().includes(q)||item.en.toLowerCase().includes(q)){
          results.push({...item, catId:cat.id, secId:sec.id});
        }
      });
    });
    (sec.nestedCats||[]).forEach(nc=>{
      (nc.items||[]).forEach(item=>{
        if(item.vi.toLowerCase().includes(q)||item.en.toLowerCase().includes(q)){
          results.push({...item, secId:sec.id});
        }
      });
    });
    (sec.lensOptions||[]).forEach(l=>{
      if(l.vi.toLowerCase().includes(q)||l.mm.includes(q)){
        results.push({vi:l.mm+"mm "+l.vi, en:l.mm+"mm", img:"", catId:"lens", secId:sec.id});
      }
    });
  });
  if(cnt) cnt.textContent=results.length+" kết quả";
  if(grid) grid.innerHTML = results.map(r=>vcardHTML(r, r.catId||"")).join("");
  if(sr) sr.style.display="";
  document.getElementById("sectionsContainer").style.display="none";
  document.querySelector(".douyin-banner").style.display="none";
  document.querySelector(".quality-section").style.display="none";
}

// ═══════════════════════════════════════════════════════════════
// RENDER HELPERS
// ═══════════════════════════════════════════════════════════════

function esc(s){ return (s||"").replace(/'/g,"\\'").replace(/"/g,'&quot;'); }

function vcardHTML(item, catId, extraClass=""){
  const isSel = state.selections[catId]===item.en;
  const isFaved = isFav(catId, item.en);
  const isLocked = state.lockedCats[catId];
  const imgHtml = item.img
    ? `<div class="vcard-img"><img src="${item.img}" onerror="this.parentElement.innerHTML='<div class=\\'vcard-placeholder\\'><div class=\\'vcard-placeholder-icon\\'>${item.icon||"◈"}</div><div class=\\'vcard-placeholder-label\\'>No Image</div></div>'" alt="${item.vi}" loading="lazy"></div>`
    : `<div class="vcard-placeholder"><div class="vcard-placeholder-icon">${item.icon||"◈"}</div><div class="vcard-placeholder-label">Placeholder</div></div>`;
  return `<div class="vcard${isSel?' selected':''}${extraClass?' '+extraClass:''}" onclick="setSelection('${catId}','${esc(item.en)}')">
    ${imgHtml}
    <div class="vcard-info">
      <div class="vcard-name">${item.vi}</div>
      <div class="vcard-en">${item.en}</div>
    </div>
    <div class="vcard-actions">
      <div class="vcard-fav${isFaved?' active':''}" title="${isFaved?'Bỏ yêu thích':'Thêm yêu thích'}"
        onclick="event.stopPropagation();toggleFav('${catId}','${esc(item.en)}','${esc(item.vi)}','${item.img||''}')">★</div>
      ${item.img?`<div class="vcard-preview" title="Xem ảnh" onclick="event.stopPropagation();openModal('${item.img}','${esc(item.vi)}','${esc(item.en)}')">⤢</div>`:''}
    </div>
    ${isLocked?'<div class="vcard-lock locked">🔒</div>':''}
    <div class="vcard-selected-check">✓</div>
  </div>`;
}

function chipHTML(item, catId){
  const isSel = state.selections[catId]===item.en;
  return `<button class="chip${isSel?' selected':''}" onclick="setSelection('${catId}','${esc(item.en)}')">${item.vi}</button>`;
}

// ═══════════════════════════════════════════════════════════════
// CAROUSEL COMPONENT
// ═══════════════════════════════════════════════════════════════

function getItemsPerView() {
  const w = window.innerWidth;
  if (w <= 600) return 2;
  if (w <= 900) return 3;
  return 5;
}

function makeCarouselHTML(id, itemsHtml, totalItems) {
  if (!state.carouselPages) state.carouselPages = {};
  
  const itemsPerView = getItemsPerView();
  const maxPage = Math.max(0, Math.ceil(totalItems / itemsPerView) - 1);
  
  let activePage = state.carouselPages[id] || 0;
  if (activePage > maxPage) {
    activePage = maxPage;
    state.carouselPages[id] = maxPage;
  }
  
  const showArrows = totalItems > itemsPerView;
  const prevDisabled = activePage === 0 ? 'disabled' : '';
  const nextDisabled = activePage === maxPage ? 'disabled' : '';
  
  const transformStyle = activePage > 0 ? `style="transform: translateX(-${activePage * 100}%);"` : '';
  
  return `
    <div class="carousel-container" id="carousel-container-${id}">
      ${showArrows ? `<button class="carousel-btn prev" ${prevDisabled} onclick="event.stopPropagation(); slideCarousel('${id}', -1, ${totalItems})">◀</button>` : ''}
      <div class="carousel-viewport">
        <div class="visual-grid carousel-track" id="carousel-track-${id}" ${transformStyle}>
          ${itemsHtml}
        </div>
      </div>
      ${showArrows ? `<button class="carousel-btn next" ${nextDisabled} onclick="event.stopPropagation(); slideCarousel('${id}', 1, ${totalItems})">▶</button>` : ''}
    </div>
  `;
}

function slideCarousel(id, direction, totalItems) {
  if (!state.carouselPages) state.carouselPages = {};
  const curPage = state.carouselPages[id] || 0;
  const itemsPerView = getItemsPerView();
  const maxPage = Math.max(0, Math.ceil(totalItems / itemsPerView) - 1);
  
  let newPage = curPage + direction;
  if (newPage < 0) newPage = 0;
  if (newPage > maxPage) newPage = maxPage;
  
  state.carouselPages[id] = newPage;
  
  const track = document.getElementById(`carousel-track-${id}`);
  if (track) {
    track.style.transform = `translateX(-${newPage * 100}%)`;
  }
  
  const container = document.getElementById(`carousel-container-${id}`);
  if (container) {
    const prevBtn = container.querySelector('.carousel-btn.prev');
    const nextBtn = container.querySelector('.carousel-btn.next');
    if (prevBtn) {
      if (newPage === 0) prevBtn.setAttribute('disabled', 'true');
      else prevBtn.removeAttribute('disabled');
    }
    if (nextBtn) {
      if (newPage === maxPage) nextBtn.setAttribute('disabled', 'true');
      else nextBtn.removeAttribute('disabled');
    }
  }
}

// Window resize listener to update carousels dynamically
window.addEventListener('resize', () => {
  render();
});

// ═══════════════════════════════════════════════════════════════
// RENDER SECTIONS
// ═══════════════════════════════════════════════════════════════

function renderSections(){
  const container = document.getElementById("sectionsContainer");
  let html = "";
  SECTIONS.forEach(sec=>{
    const isCollapsed = !!state.collapsedGroups[sec.id];
    const selCount = countSelectionsInSection(sec);
    const totalCount = countTotalInSection(sec);
    html += `<div class="section-group fade-in">
      <div class="section-group-header" onclick="toggleGroup('${sec.id}')">
        <span class="section-group-header-icon">${sec.icon}</span>
        <span>${sec.vi}</span>
        <span id="sgsel-${sec.id}" class="section-group-sel">${selCount}/${totalCount}</span>
        <span id="sgchev-${sec.id}" class="section-group-chevron${isCollapsed?'':' open'}">▶</span>
      </div>
      <div id="sgbody-${sec.id}" class="section-group-body${isCollapsed?' collapsed':''}">
        ${renderSectionBody(sec)}
      </div>
    </div>`;
  });
  container.innerHTML = html;
}

function renderSectionBody(sec){
  if(sec.type==="visual") return renderVisualSection(sec);
  if(sec.type==="nested") return renderNestedSection(sec);
  if(sec.type==="camera") return renderCameraSection(sec);
  if(sec.type==="chips") return renderChipsSection(sec);
  return "";
}

function renderVisualSection(sec){
  return (sec.cats||[]).map(cat=>{
    const isLocked = !!state.lockedCats[cat.id];
    return `<div style="margin-bottom:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <div style="font-size:10px;color:var(--text3);letter-spacing:.2em;text-transform:uppercase">${cat.vi}</div>
        <div style="display:flex;gap:6px;align-items:center">
          ${state.selections[cat.id]?`<span style="font-size:9px;color:var(--gold);padding:2px 8px;border:1px solid var(--gold3);border-radius:2px">${state.selections[cat.id]}</span>`:''}
          <button class="lock-btn${isLocked?' locked':''}" onclick="toggleLock('${cat.id}')">${isLocked?'🔒':'🔓'}</button>
          <button class="btn btn-xs" onclick="_randomizeSingle('${cat.id}')">⚄</button>
          ${state.selections[cat.id]?`<button class="btn btn-xs btn-danger" onclick="setSelection('${cat.id}','${esc(state.selections[cat.id]||'')}')">✕</button>`:''}
        </div>
      </div>
      ${makeCarouselHTML(cat.id, (cat.items||[]).map(item=>vcardHTML(item, cat.id)).join(""), cat.items.length)}
    </div>`;
  }).join("");
}

function renderNestedSection(sec){
  return (sec.nestedCats||[]).map(nc=>{
    const isOpen = !!state.openNestedCats[nc.id];
    const selInCat = nc.items.filter(i=> state.selections[i.catId||nc.id]===i.en).length;
    return `<div class="nested-cat">
      <div class="nested-cat-header${isOpen?' active':''}" id="nchdr-${nc.id}" onclick="toggleNestedCat('${nc.id}')">
        <span class="nested-cat-icon">${nc.icon||"◈"}</span>
        <span class="nested-cat-name">${nc.vi}</span>
        ${selInCat>0?`<span class="nested-cat-count">${selInCat} đã chọn</span>`:''}
        <span class="nested-cat-arrow${isOpen?' open':''}" id="ncarr-${nc.id}">▶</span>
      </div>
      <div class="nested-cat-sub${isOpen?' open':''}" id="ncsub-${nc.id}">
        ${makeCarouselHTML(nc.id, nc.items.map(item=>vcardHTML(item, item.catId||nc.id)).join(""), nc.items.length)}
      </div>
    </div>`;
  }).join("");
}

function renderCameraSection(sec){
  let html = "";
  // Regular cats
  (sec.cats||[]).forEach(cat=>{
    html+=`<div style="margin-bottom:16px">
      <div style="font-size:10px;color:var(--text3);letter-spacing:.2em;text-transform:uppercase;margin-bottom:8px">${cat.vi}</div>
      ${makeCarouselHTML(cat.id, cat.items.map(item=>vcardHTML(item, cat.id)).join(""), cat.items.length)}
    </div>`;
  });
  // Lens
  if(sec.lensOptions){
    const curLens = state.selections["lens"]||"";
    html+=`<div style="margin-bottom:16px">
      <div style="font-size:10px;color:var(--text3);letter-spacing:.2em;text-transform:uppercase;margin-bottom:8px">Ống kính</div>
      <div class="lens-grid">
        ${sec.lensOptions.map(l=>{
          const sel = curLens===(l.mm+"mm");
          const fovW = Math.round(l.fovH*0.6)+"%";
          return `<div class="lens-card${sel?' selected':''}" onclick="setSelection('lens','${l.mm}mm')">
            <div class="lens-mm">${l.mm}</div>
            <div class="lens-name">${l.vi}</div>
            <div class="lens-fov">
              <div class="lens-fov-inner" style="width:${fovW};height:100%"></div>
            </div>
            <div class="lens-use">${l.use}</div>
          </div>`;
        }).join("")}
      </div>
    </div>`;
  }
  return html;
}

function renderChipsSection(sec){
  return (sec.cats||[]).map(cat=>`
    <div style="margin-bottom:12px">
      <div style="font-size:10px;color:var(--text3);letter-spacing:.2em;text-transform:uppercase;margin-bottom:8px">${cat.vi}</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${cat.items.map(item=>chipHTML(item, cat.id)).join("")}
      </div>
    </div>
  `).join("");
}

// ═══════════════════════════════════════════════════════════════
// RENDER SIDEBAR
// ═══════════════════════════════════════════════════════════════

function renderSidebar(){
  const nav = document.getElementById("sidebarNav");
  if(!nav) return;
  nav.innerHTML = SECTIONS.map(sec=>{
    const sel = countSelectionsInSection(sec);
    return `<div class="nav-item" onclick="scrollToSection('${sec.id}')">
      <span class="nav-icon">${sec.icon}</span>
      <span>${sec.vi}</span>
      ${sel>0?`<span class="nav-badge">${sel}</span>`:''}
    </div>`;
  }).join("");
  // Stats
  const totalSel = Object.keys(state.selections).length;
  const totalCats = SECTIONS.reduce((a,s)=>{
    a += (s.cats||[]).length;
    if(s.lensOptions) a++;
    return a;
  },0);
  const el1=document.getElementById("statSelected");
  const el2=document.getElementById("statLength");
  if(el1) el1.textContent=totalSel+" / "+totalCats;
  if(el2) el2.textContent=buildPrompt().length+" ký tự";
  // Douyin badge
  const db=document.getElementById("douyinBadge");
  const di=document.getElementById("douyinNavItem");
  if(db) db.style.display=state.douyinMode?"":"none";
  if(di){ di.classList.toggle("active",state.douyinMode); }
  // Fav count
  const fc=document.getElementById("favCount");
  if(fc) fc.textContent=state.favorites.length;
}

function updateHistoryCount(){
  const hc=document.getElementById("histCount");
  if(hc) hc.textContent=state.history.length;
}

function scrollToSection(id){
  const el=document.getElementById("section-"+id)||
    document.querySelector(`[data-secid="${id}"]`)||
    document.getElementById("sgbody-"+id);
  if(el) el.scrollIntoView({behavior:"smooth",block:"start"});
}

// ═══════════════════════════════════════════════════════════════
// RENDER QUALITY + OUTPUT
// ═══════════════════════════════════════════════════════════════

function renderQuality(){
  const track=document.getElementById("qualityTrack");
  if(!track) return;
  track.innerHTML = QUALITY_LEVELS.map((q,i)=>`
    <div class="quality-option${state.qualityLevel===q.id?' active':''}" onclick="setQuality('${q.id}')">
      <span class="quality-option-label">${q.vi}</span>
      <div class="quality-dots">${[0,1,2,3].map(d=>`<div class="quality-dot${d<=i?' filled':''}"></div>`).join("")}</div>
    </div>
  `).join("");
}

function renderOutput(){
  const tabs=["Universal","GPT Image","Grok","Banana/Flux","Negative"];
  const tabsEl=document.getElementById("outputTabs");
  if(tabsEl) tabsEl.innerHTML=tabs.map(t=>`
    <div class="output-tab${state.activeTab===t?' active':''}" onclick="setTab('${t}')">${t}</div>
  `).join("");
  const content=getTabContent();
  const disp=document.getElementById("promptDisplay");
  if(disp){
    if(state.activeTab==="Negative"){
      disp.className="negative-box";
      disp.textContent=NEGATIVE_PROMPT;
    } else {
      disp.className="prompt-box";
      disp.textContent=content||"— Chọn các tùy chọn để tạo prompt —";
    }
  }
  const cc=document.getElementById("charCount");
  if(cc) cc.textContent=content.length+" ký tự";
  const cl=document.getElementById("copyTabLabel");
  if(cl) cl.textContent=state.activeTab;
}

function renderDouyinBanner(){
  const banner=document.getElementById("douyinBanner");
  const toggle=document.getElementById("douyinToggle");
  if(banner) banner.classList.toggle("active",state.douyinMode);
  if(toggle) toggle.textContent=state.douyinMode?"Đang bật":"Kích hoạt";
}

// ═══════════════════════════════════════════════════════════════
// FULL RENDER
// ═══════════════════════════════════════════════════════════════

function render(){
  renderSidebar();
  renderQuality();
  renderSections();
  renderDouyinBanner();
  renderOutput();
  updateHistoryCount();
}

// ═══════════════════════════════════════════════════════════════
// COPY + MODAL + TOAST
// ═══════════════════════════════════════════════════════════════

function copyCurrentTab(){ copyText(getTabContent()); }
function copyFullPackage(){ copyText(buildPrompt()+"\n\nNEGATIVE:\n"+NEGATIVE_PROMPT); }

function copyText(txt){
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(()=>showToast("⎘ Đã sao chép!")).catch(()=>fallbackCopy(txt));
  } else { fallbackCopy(txt); }
}

function fallbackCopy(txt){
  const ta=document.createElement("textarea");
  ta.value=txt;ta.style.cssText="position:fixed;opacity:0;top:0;left:0";
  document.body.appendChild(ta);ta.select();
  try{ document.execCommand("copy"); showToast("⎘ Đã sao chép!"); }
  catch(e){ showToast("Sao chép thất bại"); }
  document.body.removeChild(ta);
}

let toastTimer=null;
function showToast(msg){
  const t=document.getElementById("toast");
  if(!t) return;
  t.textContent=msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove("show"),2200);
}

function openModal(img,name,desc){
  document.getElementById("modalImg").src=img;
  document.getElementById("modalName").textContent=name;
  document.getElementById("modalDesc").textContent=desc;
  document.getElementById("modalOverlay").style.display="flex";
}
function closeModal(){
  document.getElementById("modalOverlay").style.display="none";
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

function countSelectionsInSection(sec){
  let n=0;
  (sec.cats||[]).forEach(cat=>{ if(state.selections[cat.id]) n++; });
  if(sec.lensOptions&&state.selections["lens"]) n++;
  (sec.nestedCats||[]).forEach(nc=>{
    const seen=new Set();
    nc.items.forEach(i=>{ const cid=i.catId||nc.id; if(!seen.has(cid)&&state.selections[cid]){seen.add(cid);n++;} });
  });
  return n;
}

function countTotalInSection(sec){
  let n=(sec.cats||[]).length;
  if(sec.lensOptions) n++;
  const seenCats=new Set();
  (sec.nestedCats||[]).forEach(nc=>nc.items.forEach(i=>{
    const cid=i.catId||nc.id; if(!seenCats.has(cid)){seenCats.add(cid);n++;}
  }));
  return n;
}

function _randomizeSingle(catId){
  if(state.lockedCats[catId]) return;
  SECTIONS.forEach(sec=>{
    (sec.cats||[]).forEach(cat=>{
      if(cat.id===catId&&cat.items&&cat.items.length){
        state.selections[catId]=pickRandom(cat.items).en;
      }
    });
  });
  render();
}

// ═══════════════════════════════════════════════════════════════
// THEME toggling
// ═══════════════════════════════════════════════════════════════

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('mexo_theme', newTheme);
  updateThemeIcon(newTheme);
  showToast(newTheme === 'dark' ? '🌙 Đã chuyển sang chế độ Tối' : '☀️ Đã chuyển sang chế độ Sáng');
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggle');
  if (btn) {
    btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    btn.title = theme === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối';
  }
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════

loadStorage();
render();
updateThemeIcon(document.documentElement.getAttribute('data-theme') || 'dark');