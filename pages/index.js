import { useState, useEffect } from "react";

// ── localStorage ──────────────────────────────────────────────────────
const LS_KEY = "worddex_data";
function loadLS(){ try{ return JSON.parse(localStorage.getItem(LS_KEY))||{}; }catch{ return {}; } }
function saveLS(data){ try{ localStorage.setItem(LS_KEY, JSON.stringify(data)); }catch{} }

// ── 색상 토큰 ─────────────────────────────────────────────────────────
const C = {
  bg:"#F7F6F2", white:"#FFFFFF", ink:"#1A1A2E", soft:"#6B7280", border:"#E5E4DF",
  blue:"#3B82F6", blueBg:"#EFF6FF", blueText:"#1D4ED8",
  green:"#10B981", greenBg:"#ECFDF5", greenText:"#065F46",
  amber:"#F59E0B", amberBg:"#FFFBEB", amberText:"#92400E",
  red:"#EF4444", redBg:"#FEF2F2", redText:"#991B1B",
  purple:"#8B5CF6", purpleBg:"#F5F3FF", purpleText:"#5B21B6",
};

const LEVEL_DESC = {
  1:"입문 · 기초 어휘",
  2:"초급 · 짧은 이야기",
  3:"중급 · 교훈 있는 이야기",
  4:"고급 · 깊이 있는 읽기"
};

// ── 스토리 데이터 ─────────────────────────────────────────────────────
const STORIES = {
  1:[
    { id:"lv1s1", title:"The Kind Dog",
      raw:`A [dog] lived near a [big] tree. One day, a [cat] fell into the water. The dog [jumped] and saved the cat. The cat said, "[Thank] you!" The dog smiled. They became [friends].`,
      translation:`강아지 한 마리가 큰 나무 근처에 살고 있었어요. 어느 날, 고양이 한 마리가 물에 빠졌어요. 강아지는 뛰어들어 고양이를 구해줬어요. 고양이는 "고마워!"라고 말했어요. 강아지는 미소 지었어요. 둘은 친구가 되었어요.`,
      vocab:["dog","big","cat","jumped","thank","friends"] },
    { id:"lv1s2", title:"My Red Apple",
      raw:`Tom had a red [apple]. He was very [hungry]. He wanted to [eat] it. But he saw a small [bird]. The bird looked [sad]. Tom gave the apple to the bird. The bird sang a [happy] song.`,
      translation:`Tom은 빨간 사과를 가지고 있었어요. 그는 매우 배가 고팠어요. 그는 사과를 먹고 싶었어요. 그런데 작은 새 한 마리를 발견했어요. 새는 슬퍼 보였어요. Tom은 새에게 사과를 줬어요. 새는 행복한 노래를 불렀어요.`,
      vocab:["apple","hungry","eat","bird","sad","happy"] },
    { id:"lv1s3", title:"A Sunny Day",
      raw:`Today is a [sunny] day. Mia goes to the [park] with her mom. She sees a [butterfly] and runs after it. The butterfly [flies] away. Mia finds a [flower] instead. She gives it to her mom. Her mom says, "I [love] you!"`,
      translation:`오늘은 화창한 날이에요. Mia는 엄마와 함께 공원에 가요. 나비 한 마리를 발견하고 쫓아가요. 나비는 날아가버렸어요. 대신 Mia는 꽃을 하나 발견해요. 엄마에게 꽃을 드려요. 엄마가 말해요, "사랑해!"`,
      vocab:["sunny","park","butterfly","flies","flower","love"] },
    { id:"lv1s4", title:"The Lost Ball",
      raw:`Sam has a [round] ball. He [kicks] it too hard. The ball goes over the [fence]. Sam feels [worried]. His neighbor Mrs. Kim [finds] the ball. She [returns] it to Sam. Sam says thank you.`,
      translation:`Sam은 둥근 공을 가지고 있어요. 너무 세게 찼더니 공이 담장을 넘어갔어요. Sam은 걱정이 됐어요. 이웃 김 아주머니가 공을 발견했어요. 아주머니가 Sam에게 공을 돌려줬어요. Sam은 감사하다고 말했어요.`,
      vocab:["round","kicks","fence","worried","finds","returns"] },
    { id:"lv1s5", title:"Ice Cream Day",
      raw:`It is a [hot] summer day. Dad takes Lily to get [ice cream]. Lily wants [chocolate] flavor. But the shop is [sold] out. She [chooses] strawberry instead. It is [delicious]. Lily smiles.`,
      translation:`더운 여름날이에요. 아빠가 Lily를 아이스크림 가게에 데려가요. Lily는 초콜릿 맛을 원했어요. 그런데 다 팔렸어요. 대신 딸기 맛을 골랐어요. 정말 맛있어요. Lily가 미소 지어요.`,
      vocab:["hot","ice cream","chocolate","sold","chooses","delicious"] },
  ],
  2:[
    { id:"lv2s1", title:"The Clever Fox and the Crow",
      raw:`A crow found a piece of [cheese] and flew to a tall tree to eat it. A fox saw the crow and wanted the cheese. The fox thought of a [clever] plan. "Dear crow," said the fox, "I have heard that you have a [beautiful] voice. Will you sing a song for me?" The crow felt [proud] and opened its [beak] to sing. The cheese fell from its beak. The fox [quickly] [grabbed] the cheese and ran away. The crow learned an important [lesson] that day. [Flattery] can be [dangerous].`,
      translation:`까마귀 한 마리가 치즈 한 조각을 발견하고 높은 나무 위로 날아갔어요. 여우가 까마귀를 보고 치즈를 갖고 싶었어요. 여우는 영리한 계획을 생각해냈어요. 여우가 말했어요, "네가 아름다운 목소리를 가졌다고 들었어. 나를 위해 노래해줄 수 있어?" 까마귀는 자랑스러운 마음에 부리를 열어 노래하려 했어요. 치즈가 부리에서 떨어졌어요. 여우는 재빨리 치즈를 낚아채고 달아났어요. 까마귀는 그날 중요한 교훈을 얻었어요. 아첨은 위험할 수 있어요.`,
      vocab:["cheese","clever","beautiful","proud","beak","quickly","grabbed","lesson","flattery","dangerous"] },
    { id:"lv2s2", title:"The Hare and the Tortoise",
      raw:`A [hare] and a [tortoise] decided to have a race. The hare was very fast and felt [confident]. He ran ahead and then stopped to [rest] under a tree. He fell [asleep]. The tortoise walked slowly but never [stopped]. When the hare woke up, the tortoise had already [reached] the finish line. The tortoise [won] the race.`,
      translation:`토끼와 거북이가 달리기 시합을 하기로 했어요. 토끼는 매우 빠르고 자신감이 넘쳤어요. 토끼는 앞서 달리다가 나무 아래서 쉬기로 했어요. 그는 잠들어버렸어요. 거북이는 느리게 걸었지만 절대 멈추지 않았어요. 토끼가 깨어났을 때 거북이는 이미 결승선에 도달해 있었어요. 거북이가 시합에서 이겼어요.`,
      vocab:["hare","tortoise","confident","rest","asleep","stopped","reached","won"] },
    { id:"lv2s3", title:"The Lion and the Mouse",
      raw:`A [lion] was sleeping in the forest. A small [mouse] ran across his face. The lion woke up and [caught] the mouse. The mouse [begged] the lion to let him go. He [promised] to help the lion one day. The lion [laughed] but let him go. Later, hunters [trapped] the lion in a net. The little mouse [chewed] through the ropes and freed the lion.`,
      translation:`사자 한 마리가 숲에서 자고 있었어요. 작은 생쥐 한 마리가 사자의 얼굴 위를 달렸어요. 사자가 깨어나 생쥐를 잡았어요. 생쥐는 살려달라고 애원했어요. 언젠가 꼭 도와주겠다고 약속했어요. 사자는 웃었지만 풀어줬어요. 나중에 사냥꾼들이 사자를 그물에 가뒀어요. 작은 생쥐가 밧줄을 갉아끊어 사자를 구해줬어요.`,
      vocab:["lion","mouse","caught","begged","promised","laughed","trapped","chewed"] },
    { id:"lv2s4", title:"The Goose and the Golden Eggs",
      raw:`A farmer had a [goose] that laid a [golden] egg every day. The farmer was very [greedy]. He thought there must be many golden eggs [inside] the goose. He decided to cut the goose [open]. But he found nothing. Now the goose was [dead] and he had no more golden eggs. His [greed] had [destroyed] everything.`,
      translation:`농부에게 매일 황금 달걀을 낳는 거위가 있었어요. 농부는 매우 욕심이 많았어요. 거위 안에 황금 달걀이 많이 들어있을 거라고 생각했어요. 거위를 열어보기로 했어요. 하지만 아무것도 없었어요. 거위는 죽었고 황금 달걀도 더 이상 없었어요. 욕심이 모든 것을 망쳐버렸어요.`,
      vocab:["goose","golden","greedy","inside","open","dead","greed","destroyed"] },
    { id:"lv2s5", title:"The Ant and the Grasshopper",
      raw:`All summer, the [ant] worked hard and [stored] food for winter. The [grasshopper] sang and [played] all day. "Why work so hard?" the grasshopper [laughed]. Winter came. The grasshopper had no food and was [starving]. He went to the ant and [begged] for food. The ant said, "You played all summer. Now you must [suffer]."`,
      translation:`여름 내내 개미는 열심히 일하며 겨울을 위해 음식을 저장했어요. 메뚜기는 하루 종일 노래하고 놀았어요. "왜 그렇게 열심히 일해?" 메뚜기가 비웃었어요. 겨울이 왔어요. 메뚜기는 먹을 것이 없어 굶주렸어요. 개미에게 찾아가 음식을 구걸했어요. 개미가 말했어요, "여름 내내 놀았잖아. 이제 그 결과를 받아들여야 해."`,
      vocab:["ant","stored","grasshopper","played","laughed","starving","begged","suffer"] },
  ],
  3:[
    { id:"lv3s1", title:"The Wind and the Sun",
      raw:`The Wind and the Sun were [arguing] about who was stronger. They saw a [traveler] wearing a coat. The Wind said, "I can [remove] his coat." The Wind blew as hard as it could, but the traveler pulled his coat [tighter]. Then the Sun shone [warmly]. Soon the traveler felt [uncomfortable] and took off his coat. The Sun had won. [Persuasion] is more [effective] than [force].`,
      translation:`바람과 태양이 누가 더 강한지 다투고 있었어요. 그들은 코트를 입은 여행자를 발견했어요. 바람이 말했어요, "내가 그의 코트를 벗길 수 있어." 바람이 힘껏 불었지만, 여행자는 코트를 더 꽉 잡아당겼어요. 그러자 태양이 따뜻하게 빛났어요. 곧 여행자는 더워서 코트를 벗었어요. 태양이 이겼어요. 설득이 힘보다 더 효과적이에요.`,
      vocab:["arguing","traveler","remove","tighter","warmly","uncomfortable","persuasion","effective","force"] },
    { id:"lv3s2", title:"The Boy Who Cried Wolf",
      raw:`A shepherd boy was [bored] watching his sheep on the hill. He decided to play a trick and [shouted], "Wolf! Wolf!" The [villagers] ran up to help, but found no wolf. The boy [laughed] at them. He did this [twice]. Then a real wolf came. The boy shouted for help, but this time the villagers did not [believe] him. They thought he was [lying] again. The wolf [scattered] all the sheep.`,
      translation:`양치기 소년이 언덕에서 양을 돌보다 지루해졌어요. 장난을 치기로 하고 "늑대야! 늑대야!"라고 외쳤어요. 마을 사람들이 도우러 달려왔지만 늑대는 없었어요. 소년은 그들을 보며 웃었어요. 이런 장난을 두 번이나 했어요. 그러자 진짜 늑대가 왔어요. 소년이 도움을 외쳤지만 이번엔 마을 사람들이 믿지 않았어요. 또 거짓말한다고 생각했어요. 늑대는 양들을 모두 흩어버렸어요.`,
      vocab:["bored","shouted","villagers","laughed","twice","believe","lying","scattered"] },
    { id:"lv3s3", title:"King Midas and the Golden Touch",
      raw:`King Midas loved gold more than anything. One day, a god [granted] him a wish: everything he [touched] would turn to gold. At first, Midas was [overjoyed]. But when he touched his food, it turned to gold. When he [embraced] his daughter, she became a golden [statue]. Midas [begged] the god to take back the gift. He had learned that [greed] leads to [misery].`,
      translation:`미다스 왕은 무엇보다 황금을 사랑했어요. 어느 날, 신이 그의 소원을 들어줬어요. 손으로 만지는 것은 무엇이든 황금으로 변하는 능력이었어요. 처음에 미다스는 무척 기뻐했어요. 하지만 음식에 손을 대자 황금으로 변했어요. 딸을 안았더니 황금 조각상이 되어버렸어요. 미다스는 신에게 그 능력을 거두어달라고 빌었어요. 탐욕은 불행을 부른다는 것을 깨달았어요.`,
      vocab:["granted","touched","overjoyed","embraced","statue","begged","greed","misery"] },
    { id:"lv3s4", title:"The Three Questions",
      raw:`A king wanted to know three things: the best [moment] to act, the most [important] person, and the right thing to do. He [visited] a wise hermit. While there, he [rescued] a wounded man. Later, the man [revealed] he had come to kill the king, but now felt [grateful]. The hermit explained: the most important moment is [now], the most important person is the one before you, and the right thing is to do [good].`,
      translation:`왕은 세 가지를 알고 싶었어요. 행동할 가장 좋은 순간, 가장 중요한 사람, 그리고 해야 할 올바른 일. 현명한 은둔자를 찾아갔어요. 그곳에서 부상당한 사람을 구해줬어요. 나중에 그 사람은 왕을 죽이러 왔었지만 이제 감사하다고 밝혔어요. 은둔자가 설명했어요: 가장 중요한 순간은 지금, 가장 중요한 사람은 지금 앞에 있는 사람, 그리고 해야 할 일은 선을 행하는 것이에요.`,
      vocab:["moment","important","visited","rescued","revealed","grateful","now","good"] },
    { id:"lv3s5", title:"The Selfish Giant",
      raw:`A giant had a [beautiful] garden. He was [selfish] and [forbidden] children from entering. The garden became cold and [frozen] because of his [cruelty]. One winter day, children [sneaked] in and the garden bloomed again. The giant [realized] his mistake. He [welcomed] the children and the garden stayed warm forever.`,
      translation:`거인에게 아름다운 정원이 있었어요. 거인은 이기적이어서 아이들이 정원에 들어오는 것을 금지했어요. 거인의 잔인함 때문에 정원은 차갑게 얼어버렸어요. 어느 겨울날, 아이들이 몰래 들어왔고 정원에 다시 꽃이 피었어요. 거인은 자신의 실수를 깨달았어요. 아이들을 환영했고 정원은 영원히 따뜻하게 유지됐어요.`,
      vocab:["beautiful","selfish","forbidden","frozen","cruelty","sneaked","realized","welcomed"] },
  ],
  4:[
    { id:"lv4s1", title:"The Gift of the Magi",
      raw:`Della had only one dollar and eighty-seven cents to buy a [Christmas] gift for Jim. She had two [treasures]: her long beautiful hair, and Jim's gold [watch]. To buy Jim a gift, Della [sacrificed] her hair and sold it. She bought a [platinum] chain for Jim's watch. When Jim came home, he [stared] at Della. He had sold his watch to buy [jeweled] combs for Della's hair. Their gifts were now [useless], but their love was [priceless].`,
      translation:`Della는 Jim에게 크리스마스 선물을 사기 위해 1달러 87센트밖에 없었어요. 그녀에게는 두 가지 보물이 있었어요: 길고 아름다운 머리카락과 Jim의 금시계였어요. Jim에게 선물을 사기 위해 Della는 머리카락을 희생하고 팔았어요. 그녀는 Jim의 시계를 위한 백금 체인을 샀어요. Jim이 집에 왔을 때 그는 Della를 멍하니 바라봤어요. 그는 Della의 머리카락을 위한 보석 빗을 사려고 시계를 팔았던 거예요. 그들의 선물은 이제 쓸모없었지만, 그들의 사랑은 값을 매길 수 없었어요.`,
      vocab:["christmas","treasures","watch","sacrificed","platinum","stared","jeweled","useless","priceless"] },
    { id:"lv4s2", title:"Helen Keller",
      raw:`Helen Keller was born in 1880. When she was nineteen months old, she became [deaf] and [blind]. The young Helen was [frustrated] and often had [tantrums]. Her teacher Anne Sullivan arrived when Helen was six. Sullivan was very [patient] and [determined]. She taught Helen by [spelling] words into her hand. One day, at a water pump, Helen [understood] that every object had a name. This [breakthrough] changed her life [forever].`,
      translation:`헬렌 켈러는 1880년에 태어났어요. 생후 19개월이 되었을 때 청각과 시각을 잃었어요. 어린 헬렌은 좌절했고 자주 짜증을 부렸어요. 헬렌이 여섯 살 때 선생님 앤 설리번이 찾아왔어요. 설리번은 매우 인내심이 있고 의지가 강했어요. 그녀는 헬렌의 손에 단어를 철자로 써주며 가르쳤어요. 어느 날 물 펌프 앞에서 헬렌은 모든 사물에 이름이 있다는 것을 깨달았어요. 이 획기적인 순간이 그녀의 삶을 영원히 바꿔놓았어요.`,
      vocab:["deaf","blind","frustrated","tantrums","patient","determined","spelling","understood","breakthrough","forever"] },
    { id:"lv4s3", title:"The Last Leaf",
      raw:`Johnsy was very sick with [pneumonia] and [convinced] she would die when the last leaf fell. Her friend Sue was [worried]. Their neighbor Behrman was a [struggling] artist who had never painted his [masterpiece]. One stormy night, he [secretly] painted a leaf on the wall. Johnsy saw the leaf still there and [recovered] her will to live. Behrman [died] of pneumonia — he had caught it painting in the storm.`,
      translation:`Johnsy는 폐렴으로 매우 아팠고, 창밖 담쟁이덩굴의 마지막 잎이 떨어지면 자신도 죽을 거라 믿었어요. 친구 Sue는 걱정됐어요. 이웃의 나이 든 화가 Behrman은 아직 걸작을 그리지 못한 예술가였어요. 폭풍이 치는 밤, 그는 몰래 벽에 잎을 그렸어요. Johnsy는 잎이 아직 있는 것을 보고 살아야겠다는 의지를 되찾았어요. Behrman은 폐렴으로 세상을 떠났어요.`,
      vocab:["pneumonia","convinced","worried","struggling","masterpiece","secretly","recovered","died"] },
    { id:"lv4s4", title:"The Invisible Man's Dilemma",
      raw:`Griffin was a scientist who [discovered] how to make himself [invisible]. At first, he felt [powerful] and [liberated]. But invisibility brought [unexpected] problems — he was always cold, could never eat in public, and felt [isolated] from everyone. When he tried to use his power to [dominate] others, people turned against him. His great [scientific] achievement had become a [prison].`,
      translation:`그리핀은 자신을 투명하게 만드는 방법을 발견한 과학자였어요. 처음에는 강하고 자유로운 느낌이었어요. 하지만 투명함은 예상치 못한 문제를 가져왔어요. 항상 추웠고, 공공장소에서 먹을 수 없었으며, 모든 사람들로부터 고립된 느낌이었어요. 다른 사람들을 지배하려 하자 사람들이 등을 돌렸어요. 위대한 과학적 성취가 감옥이 되어버렸어요.`,
      vocab:["discovered","invisible","powerful","liberated","unexpected","isolated","dominate","scientific","prison"] },
    { id:"lv4s5", title:"Two Kinds",
      raw:`Jing-mei's mother [immigrated] to America with great [hopes]. She believed her daughter could be a [prodigy]. Jing-mei was pushed to [excel] at piano, but she [resisted] her mother's [ambition]. She [deliberately] played badly at her recital. Years later, Jing-mei realized the two pieces she had once [struggled] with were two halves of the same song — one about [strife], the other about [peace].`,
      translation:`징메이의 어머니는 큰 희망을 품고 미국으로 이민 왔어요. 딸이 천재가 될 수 있다고 믿었어요. 징메이는 피아노에서 두각을 나타내도록 강요받았지만 어머니의 야망에 저항했어요. 발표회에서 일부러 서투르게 연주했어요. 나중에 징메이는 한때 힘겨웠던 두 곡이 사실 같은 노래의 두 부분임을 깨달았어요. 하나는 갈등, 다른 하나는 평화에 관한 것이었어요.`,
      vocab:["immigrated","hopes","prodigy","excel","resisted","ambition","deliberately","struggled","strife","peace"] },
  ],
};

// ── 퀴즈 데이터 ───────────────────────────────────────────────────────
const QUIZZES = {
  lv1s1:[
    { type:"ox", q:"The dog saved the cat from the water.", answer:"O", fb:"맞아요! 강아지가 물에 빠진 고양이를 구해줬어요." },
    { type:"mc", q:"Why did the cat say 'Thank you'?", opts:["The dog gave food","The dog saved it","The dog played with it","The dog sang a song"], answer:1, fb:"맞아요! 강아지가 고양이를 물에서 구해줬기 때문이에요." },
    { type:"open", q:"If you were the dog, would you save the cat? Why? 한국어나 영어로 써봐요!" },
  ],
  lv1s2:[
    { type:"ox", q:"Tom ate the apple by himself.", answer:"X", fb:"아니에요! Tom은 슬퍼 보이는 새에게 사과를 줬어요." },
    { type:"mc", q:"Why did the bird sing a happy song?", opts:["It found food","Tom gave it the apple","It saw the sun","It saw a friend"], answer:1, fb:"맞아요! Tom이 사과를 주어서 새가 행복해했어요." },
    { type:"open", q:"Tom was hungry but gave away his apple. What do you think about that?" },
  ],
  lv1s3:[
    { type:"ox", q:"Mia caught the butterfly in the park.", answer:"X", fb:"아니에요! 나비는 날아가버렸어요. Mia는 꽃을 발견했어요." },
    { type:"mc", q:"What did Mia give to her mom?", opts:["A butterfly","A balloon","A flower","An apple"], answer:2, fb:"맞아요! Mia는 꽃을 발견해서 엄마에게 줬어요." },
    { type:"open", q:"What is something special you have given to someone you love?" },
  ],
  lv1s4:[
    { type:"ox", q:"Sam kicked the ball over the fence on purpose.", answer:"X", fb:"아니에요! 실수로 너무 세게 찼기 때문이에요." },
    { type:"mc", q:"Who returned the ball to Sam?", opts:["His teacher","His friend","Mrs. Kim","His dad"], answer:2, fb:"맞아요! 이웃 김 아주머니가 공을 돌려줬어요." },
    { type:"open", q:"Has something of yours ever gotten lost? What happened? 한국어나 영어로 써봐요!" },
  ],
  lv1s5:[
    { type:"ox", q:"Lily got the chocolate ice cream she wanted.", answer:"X", fb:"아니에요! 초콜릿 맛은 다 팔렸어요. Lily는 딸기 맛을 골랐어요." },
    { type:"mc", q:"How did Lily feel at the end?", opts:["Angry","Sad","Happy","Bored"], answer:2, fb:"맞아요! 딸기 아이스크림이 맛있어서 Lily는 행복해했어요." },
    { type:"open", q:"Have you ever wanted something but got something different? Were you still happy?" },
  ],
  lv2s1:[
    { type:"ox", q:"여우는 까마귀의 목소리가 진짜 아름답다고 생각했다.", answer:"X", fb:"아니에요! 여우는 치즈를 얻으려고 거짓으로 칭찬했어요." },
    { type:"mc", q:"까마귀가 치즈를 떨어뜨린 이유는?", opts:["나무에서 미끄러져서","노래하려고 부리를 열었기 때문에","여우가 나무를 흔들어서","치즈가 너무 무거워서"], answer:1, fb:"맞아요! 칭찬에 우쭐해진 까마귀가 노래하려고 부리를 열었을 때 치즈가 떨어졌어요." },
    { type:"mc", q:"Flattery가 뜻하는 것은?", opts:["진심 어린 칭찬","목적이 있는 빈말 칭찬","친구끼리 나누는 농담","날카로운 비판"], answer:1, fb:"정확해요! Flattery는 무언가를 얻으려는 목적의 과장된 칭찬이에요." },
    { type:"open", q:"만약 네가 까마귀였다면 여우의 칭찬을 듣고 어떻게 했을 것 같아요?" },
  ],
  lv2s2:[
    { type:"ox", q:"The hare woke up before the tortoise finished.", answer:"X", fb:"아니에요! 토끼가 깼을 때 거북이는 이미 결승선에 도달했어요." },
    { type:"mc", q:"Why did the hare lose?", opts:["Too slow","Got injured","Stopped and fell asleep","Helped the tortoise"], answer:2, fb:"맞아요! 자신감이 넘쳤던 토끼가 쉬다가 잠들어버렸어요." },
    { type:"open", q:"What can we learn from the tortoise? Give a real-life example." },
  ],
  lv2s3:[
    { type:"ox", q:"The mouse helped the lion by chewing through the ropes.", answer:"O", fb:"맞아요! 생쥐가 밧줄을 갉아끊어 사자를 구해줬어요." },
    { type:"mc", q:"Why did the lion let the mouse go at first?", opts:["Not hungry","Was scared","Laughed and was kind","Forgot the mouse"], answer:2, fb:"맞아요! 사자는 웃으면서도 생쥐를 풀어줬어요." },
    { type:"open", q:"Have you ever helped someone who helped you first?" },
  ],
  lv2s4:[
    { type:"ox", q:"The farmer found many golden eggs inside the goose.", answer:"X", fb:"아니에요! 안에는 아무것도 없었어요." },
    { type:"mc", q:"What was the farmer's mistake?", opts:["Sold the goose","Was too greedy and killed it","Forgot to feed it","Gave it away"], answer:1, fb:"맞아요! 한꺼번에 모든 것을 갖으려는 욕심이 실패를 불렀어요." },
    { type:"open", q:"'Don't kill the goose that lays the golden eggs.' What does this mean in real life?" },
  ],
  lv2s5:[
    { type:"ox", q:"The ant shared food with the grasshopper in winter.", answer:"X", fb:"아니에요! 개미는 메뚜기에게 결과를 받아들이라고 했어요." },
    { type:"mc", q:"Why was the grasshopper starving in winter?", opts:["Gave food to others","Forgot to buy food","Played all summer instead of working","Lost food in a storm"], answer:2, fb:"맞아요! 메뚜기는 여름 내내 놀면서 준비를 하지 않았어요." },
    { type:"open", q:"Is it always wrong to rest and have fun? When is it important to work hard?" },
  ],
  lv3s1:[
    { type:"ox", q:"The Wind successfully removed the traveler's coat.", answer:"X", fb:"아니에요! 바람이 세게 불수록 여행자는 코트를 더 꽉 잡았어요." },
    { type:"mc", q:"How did the Sun win?", opts:["By blowing hard","By shining warmly","By raining","By asking politely"], answer:1, fb:"맞아요! 태양이 따뜻하게 비추자 여행자 스스로 코트를 벗었어요." },
    { type:"open", q:"'Persuasion is more effective than force.' Do you agree? Give your own example." },
  ],
  lv3s2:[
    { type:"ox", q:"The villagers helped the boy when the real wolf came.", answer:"X", fb:"아니에요! 두 번이나 거짓말을 해서 마을 사람들이 믿지 않았어요." },
    { type:"mc", q:"Why didn't the villagers help the last time?", opts:["Too far away","Thought he was lying again","Afraid of wolf","Didn't hear him"], answer:1, fb:"맞아요! 두 번이나 거짓말을 해서 아무도 믿지 않게 됐어요." },
    { type:"open", q:"What is the moral of this story? Can you think of a real-life example?" },
  ],
  lv3s3:[
    { type:"ox", q:"King Midas was happy with his golden touch until the very end.", answer:"X", fb:"아니에요! 딸이 황금으로 변하자 왕은 능력을 거두어달라고 빌었어요." },
    { type:"mc", q:"What was the biggest problem with the golden touch?", opts:["Gold too heavy","His daughter turned into a statue","Couldn't sleep","People stole his gold"], answer:1, fb:"맞아요! 가장 사랑하는 딸이 황금 조각상이 된 것이 가장 큰 비극이었어요." },
    { type:"open", q:"If you could have one magical power, what would it be? What problems might it cause?" },
  ],
  lv3s4:[
    { type:"ox", q:"The king found the answers from a book.", answer:"X", fb:"아니에요! 왕은 현명한 은둔자를 직접 찾아가 경험을 통해 답을 얻었어요." },
    { type:"mc", q:"According to the hermit, who is the most important person?", opts:["The king","The wisest person","The person in front of you now","A future leader"], answer:2, fb:"맞아요! 가장 중요한 사람은 지금 이 순간 당신 앞에 있는 사람이에요." },
    { type:"open", q:"Do you agree that 'now' is the most important moment? Why or why not?" },
  ],
  lv3s5:[
    { type:"ox", q:"The giant's garden was warm before the children came.", answer:"X", fb:"아니에요! 거인이 아이들을 쫓아내면서 정원은 차갑게 얼어버렸어요." },
    { type:"mc", q:"Why did the garden bloom again?", opts:["The giant watered it","Spring arrived","The children sneaked in","A wizard helped"], answer:2, fb:"맞아요! 아이들이 들어오자 정원에 다시 봄이 찾아왔어요." },
    { type:"open", q:"The giant changed from selfish to kind. Have you ever changed your mind about something?" },
  ],
  lv4s1:[
    { type:"ox", q:"Della sold her watch to buy Jim's gift.", answer:"X", fb:"아니에요! Della는 머리카락을 팔았어요. Jim이 시계를 팔았어요." },
    { type:"mc", q:"Why were their gifts 'useless'?", opts:["Too expensive","Didn't match what they sold","Forgot to wrap them","Same gift"], answer:1, fb:"맞아요! Della는 시계줄을 샀지만 Jim은 시계를 팔았고, Jim은 머리빗을 샀지만 Della의 머리가 없었어요." },
    { type:"open", q:"The story says their love was 'priceless'. What does this mean to you?" },
  ],
  lv4s2:[
    { type:"ox", q:"Helen Keller was born deaf and blind.", answer:"X", fb:"아니에요! Helen은 건강하게 태어났지만 19개월 때 질병으로 청각과 시각을 잃었어요." },
    { type:"mc", q:"What was Helen's 'breakthrough' moment?", opts:["Met Anne Sullivan","Learned braille","Understood 'water' had a name","Graduated college"], answer:2, fb:"맞아요! 물 펌프에서 'water'의 의미를 이해한 순간이 그녀의 삶을 바꿨어요." },
    { type:"open", q:"Helen overcame huge challenges. What challenge have you overcome? How?" },
  ],
  lv4s3:[
    { type:"ox", q:"Behrman had painted many masterpieces before this story.", answer:"X", fb:"아니에요! Behrman은 평생 걸작을 꿈꿨지만 마지막 잎이 그의 진짜 걸작이었어요." },
    { type:"mc", q:"Why did Johnsy decide to live?", opts:["Sue encouraged her","She recovered naturally","The last leaf never fell","A doctor cured her"], answer:2, fb:"맞아요! 마지막 잎이 떨어지지 않는 것을 보고 Johnsy는 살아야겠다는 의지를 되찾았어요." },
    { type:"open", q:"Behrman risked his life for a stranger. Would you do something like that? Why or why not?" },
  ],
  lv4s4:[
    { type:"ox", q:"Griffin felt happy and free throughout the whole story.", answer:"X", fb:"아니에요! 처음엔 자유로운 느낌이었지만 곧 외로움과 고립감에 시달렸어요." },
    { type:"mc", q:"What was one unexpected problem with being invisible?", opts:["Lost his memory","Could never eat in public","Became too powerful","People could still see him"], answer:1, fb:"맞아요! 공공장소에서 음식을 먹을 수 없었어요." },
    { type:"open", q:"Griffin's great power became a prison. Can you think of something that seems like a gift but can also be a burden?" },
  ],
  lv4s5:[
    { type:"ox", q:"Jing-mei's mother wanted her to fail at piano.", answer:"X", fb:"아니에요! 어머니는 딸이 성공하길 간절히 원했어요." },
    { type:"mc", q:"What did Jing-mei realize at the piano after her mother's death?", opts:["She forgot how to play","The two pieces were halves of the same song","Her mother hid a letter","She finally wanted to perform"], answer:1, fb:"맞아요! 갈등과 평화를 나타내는 두 곡이 사실 하나의 곡이었어요." },
    { type:"open", q:"The two pieces represent 'strife' and 'peace'. Do you think conflict and peace can coexist in a relationship?" },
  ],
};

// ── 유틸 ──────────────────────────────────────────────────────────────
function shuffle(a){ return [...a].sort(()=>Math.random()-0.5); }

function buildQuiz(storyId){
  const pool = QUIZZES[storyId];
  if(!pool || pool.length===0) return [];
  const warmup = pool.find(q=>q.type!=="open") || pool[0];
  const rest = shuffle(pool.filter(q=>q!==warmup));
  return [warmup, ...rest];
}

function parseStory(raw){
  const seen = new Set();
  return raw.split(/(\s+)/).map((tok,i)=>{
    const m = tok.match(/^\[(\w+)\](.*)$/i);
    if(m){
      const word=m[1].toLowerCase(), after=m[2];
      if(!seen.has(word)){ seen.add(word); return {type:"vocab",word,display:m[1],after,key:i}; }
      return {type:"plain",text:m[1]+after,key:i};
    }
    return {type:"plain",text:tok,key:i};
  });
}

function speak(word){
  if(typeof window==="undefined"||!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(word);
  u.lang="en-US"; u.rate=0.85;
  window.speechSynthesis.speak(u);
}

// ✅ 핵심 변경: Anthropic API를 직접 호출하지 않고 /api/claude 프록시를 통해 호출
async function callClaude(messages, system, max_tokens=300){
  const body = { model:"claude-sonnet-4-20250514", max_tokens, messages };
  if(system) body.system = system;
  const r = await fetch("/api/claude", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(body),
  });
  if(!r.ok) throw new Error(`API error: ${r.status}`);
  const d = await r.json();
  return d.content[0].text;
}

// ── 캐릭터 설정 ───────────────────────────────────────────────────────
const CHARACTERS = {
  fox:  { name:"여우",   emoji:"🦊", stages:["🦊","🦊⭐","🦊👑"], labels:["새싹 탐험가","숲의 탐험가","전설의 탐험가"], color:"#F59E0B", bg:"#FFFBEB" },
  owl:  { name:"올빼미", emoji:"🦉", stages:["🦉","🦉⭐","🦉👑"], labels:["새싹 학자","지혜로운 학자","전설의 학자"],   color:"#8B5CF6", bg:"#F5F3FF" },
  bear: { name:"곰",     emoji:"🐻", stages:["🐻","🐻⭐","🐻👑"], labels:["새싹 독서가","책벌레 독서가","전설의 독서가"], color:"#10B981", bg:"#ECFDF5" },
};
function getStage(stars){ return stars>=50?2:stars>=20?1:0; }
function getNextGoal(stars){ return stars>=50?null:stars>=20?50:20; }

const RARITY = {
  seed:  { label:"씨앗", icon:"🌱", color:"#16A34A", bg:"#F0FDF4", border:"#86EFAC" },
  star:  { label:"별",   icon:"⭐", color:"#D97706", bg:"#FFFBEB", border:"#FCD34D" },
  crown: { label:"왕관", icon:"👑", color:"#7C3AED", bg:"#F5F3FF", border:"#C4B5FD" },
};
function getRarity(word){
  const l=word.length;
  if(l<=4) return RARITY.seed;
  if(l<=7) return RARITY.star;
  return RARITY.crown;
}

// ── 버튼 공통 컴포넌트 ────────────────────────────────────────────────
function Btn({children,onClick,variant="default",size="md",disabled,full,style:sx={}}){
  const v={
    default:{bg:C.white,color:C.ink,bc:C.border},
    primary:{bg:C.ink,color:C.white,bc:C.ink},
    success:{bg:C.greenBg,color:C.greenText,bc:C.green},
    danger: {bg:C.redBg,color:C.redText,bc:C.red},
    purple: {bg:C.purpleBg,color:C.purpleText,bc:C.purpleBg},
  }[variant]||{bg:C.white,color:C.ink,bc:C.border};
  const s={sm:{p:"5px 12px",fs:12},md:{p:"8px 16px",fs:13},lg:{p:"11px 24px",fs:14}}[size];
  return(
    <button onClick={disabled?undefined:onClick} disabled={disabled}
      style={{background:v.bg,color:v.color,border:`1px solid ${v.bc}`,borderRadius:8,
        padding:s.p,fontSize:s.fs,fontWeight:500,cursor:disabled?"default":"pointer",
        fontFamily:"inherit",width:full?"100%":"auto",opacity:disabled?0.4:1,...sx}}>
      {children}
    </button>
  );
}

function Tag({type}){
  const m={mc:[C.blueBg,C.blueText,"객관식"],ox:[C.amberBg,C.amberText,"O/X"],open:[C.greenBg,C.greenText,"주관식"]};
  const [bg,color,label]=m[type]||[C.bg,C.soft,"?"];
  return <span style={{display:"inline-block",fontSize:10,fontWeight:600,padding:"2px 9px",borderRadius:20,background:bg,color,marginBottom:10}}>{label}</span>;
}

// ── 단어 팝업 ─────────────────────────────────────────────────────────
function WordPopup({word,onClose,onSaveVocab}){
  const [info,setInfo]=useState("loading");
  const [sentence,setSentence]=useState("");
  const [fb,setFb]=useState("");
  const [checking,setChecking]=useState(false);
  const [speaking,setSpeaking]=useState(false);
  const [ran,setRan]=useState(false);

  if(!ran){
    setRan(true);
    (async()=>{
      try{
        const text=await callClaude([{role:"user",content:`Word: "${word}". Respond ONLY valid JSON (no markdown):\n{"meaning":"한국어 뜻 (5단어 이내)","context":"이 단어의 쓰임 (한국어 1문장)","example":"Simple English example sentence","challenge":"이 단어로 문장 만들기 도전 (짧게, 한국어)"}`}]);
        const j=JSON.parse(text.trim());
        setInfo(j);
        onSaveVocab(word,j.meaning);
      }catch{ setInfo("error"); }
    })();
  }

  const handleSpeak=()=>{ setSpeaking(true); speak(word); setTimeout(()=>setSpeaking(false),1400); };
  const check=async()=>{
    if(!sentence.trim()) return;
    setChecking(true);
    try{
      const text=await callClaude([{role:"user",content:`Child wrote: "${sentence}" using "${word}". Warm 2-sentence feedback in Korean. Correct gently. Start with emoji.`}],null,150);
      setFb(text);
    }catch{setFb("오류! 다시 눌러봐요");}
    setChecking(false);
  };

  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.white,borderRadius:"20px 20px 0 0",padding:"20px 18px 40px",width:"100%",maxWidth:640,borderTop:`1px solid ${C.border}`,maxHeight:"85vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:22,fontWeight:700,color:C.ink}}>{word}</span>
            <Btn size="sm" variant={speaking?"default":"default"} onClick={handleSpeak}>
              🔊 {speaking?"재생 중...":"발음 듣기"}
            </Btn>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:C.soft}}>✕</button>
        </div>
        {info==="loading"&&<div style={{fontSize:13,color:C.soft,padding:"16px 0"}}>불러오는 중...</div>}
        {info==="error"&&<div style={{fontSize:13,color:C.red,padding:"16px 0"}}>연결 오류 — 다시 탭해봐요</div>}
        {info&&info!=="loading"&&info!=="error"&&(
          <>
            <div style={{background:C.blueBg,borderRadius:10,padding:"12px 14px",marginBottom:12}}>
              <div style={{fontSize:14,fontWeight:700,color:C.blueText,marginBottom:4}}>🇰🇷 {info.meaning}</div>
              <div style={{fontSize:12,color:C.soft,marginBottom:4,lineHeight:1.6}}>{info.context}</div>
              <div style={{fontSize:12,color:C.blue,fontStyle:"italic"}}>✏️ {info.example}</div>
            </div>
            <div style={{border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px"}}>
              <div style={{fontSize:12,fontWeight:600,color:C.soft,marginBottom:8}}>🎯 {info.challenge}</div>
              <input value={sentence} onChange={e=>setSentence(e.target.value)} placeholder="영어로 써봐요"
                onKeyDown={e=>e.key==="Enter"&&check()}
                style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 10px",fontSize:13,outline:"none",fontFamily:"inherit"}}/>
              <div style={{marginTop:8}}>
                <Btn onClick={check} disabled={checking||!sentence.trim()}>{checking?"확인 중...":"확인"}</Btn>
              </div>
              {fb&&<div style={{fontSize:12,color:C.soft,marginTop:10,lineHeight:1.6}}>{fb}</div>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── 단어장 ────────────────────────────────────────────────────────────
function VocabBook({vocabData,onToggle,onClose}){
  const [filter,setFilter]=useState("all");
  const all=Object.entries(vocabData);
  const filtered=filter==="all"?all:all.filter(([,v])=>v.status===filter);
  const doneCount=all.filter(([,v])=>v.status==="완료").length;
  return(
    <div style={{minHeight:"100vh",background:"#FFF9F0"}}>
      <div style={{maxWidth:640,margin:"0 auto",padding:"16px 16px 60px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
          <Btn size="sm" onClick={onClose}>← 돌아가기</Btn>
          <div style={{fontSize:17,fontWeight:700,color:C.ink}}>나의 단어장</div>
          <div style={{marginLeft:"auto",fontSize:12,color:C.soft}}>{all.length}개 · 완료 {doneCount}개</div>
        </div>
        <div style={{display:"flex",gap:6,marginBottom:14}}>
          {["all","기억 중","완료"].map(f=>(
            <Btn key={f} size="sm" variant={f===filter?"primary":"default"} onClick={()=>setFilter(f)}>
              {f==="all"?"전체":f}
            </Btn>
          ))}
        </div>
        {filtered.length===0&&(
          <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:16,padding:40,textAlign:"center"}}>
            <div style={{fontSize:32,marginBottom:10}}>📚</div>
            <div style={{fontSize:14,color:C.soft}}>{all.length===0?"지문에서 단어를 클릭하면 여기 쌓여요!":"해당하는 단어가 없어요."}</div>
          </div>
        )}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {filtered.map(([word,data])=>{
            const status=data.status||"기억 중";
            return(
              <div key={word} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:16,padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                    <span style={{fontSize:15,fontWeight:700,color:C.ink}}>{word}</span>
                    <button onClick={()=>speak(word)} style={{background:"none",border:"none",fontSize:14,cursor:"pointer",color:C.soft,padding:0}}>🔊</button>
                  </div>
                  <div style={{fontSize:12,color:C.soft}}>{data.meaning||""}</div>
                </div>
                <Btn size="sm" variant={status==="완료"?"success":"default"} onClick={()=>onToggle(word)} style={{borderRadius:20,whiteSpace:"nowrap"}}>
                  {status==="완료"?"✓ 완료":"기억 중"}
                </Btn>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── 단어 도감 ─────────────────────────────────────────────────────────
function WordDex({vocab,onClose}){
  const [filter,setFilter]=useState("all");
  const [flipped,setFlipped]=useState({});
  const all=Object.entries(vocab);
  const filtered=filter==="all"?all:all.filter(([w])=>getRarity(w).label===filter);
  const totalWords=Object.values(STORIES).flat().reduce((acc,s)=>acc+s.vocab.length,0);
  const pct=Math.round(all.length/totalWords*100);
  const FILTERS=[{key:"all",label:"전체",icon:"📚"},{key:"씨앗",label:"씨앗",icon:"🌱"},{key:"별",label:"별",icon:"⭐"},{key:"왕관",label:"왕관",icon:"👑"}];
  return(
    <div style={{minHeight:"100vh",background:"#FFF9F0"}}>
      <div style={{maxWidth:640,margin:"0 auto",padding:"16px 16px 60px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <button onClick={onClose} style={{border:`1px solid ${C.border}`,borderRadius:12,padding:"8px 14px",fontSize:13,fontWeight:600,background:C.white,cursor:"pointer",fontFamily:"inherit"}}>← 돌아가기</button>
          <div>
            <div style={{fontSize:18,fontWeight:800,color:C.ink}}>단어 도감 🗂</div>
            <div style={{fontSize:12,color:C.soft}}>카드를 탭하면 뜻이 나와요!</div>
          </div>
          <div style={{marginLeft:"auto",textAlign:"right"}}>
            <div style={{fontSize:18,fontWeight:800,color:C.ink}}>{all.length}<span style={{fontSize:13,color:C.soft,fontWeight:400}}> / {totalWords}</span></div>
            <div style={{fontSize:11,color:C.soft}}>수집 완료</div>
          </div>
        </div>
        <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:16,padding:"14px 18px",marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
            <span style={{fontSize:13,fontWeight:700,color:C.ink}}>전체 수집 진행도</span>
            <span style={{fontSize:13,fontWeight:800,color:C.purple}}>{pct}%</span>
          </div>
          <div style={{height:12,background:"#F3F4F6",borderRadius:8,overflow:"hidden",marginBottom:12}}>
            <div style={{height:"100%",width:`${Math.min(pct,100)}%`,background:`linear-gradient(90deg,${C.green},${C.blue},${C.purple})`,borderRadius:8,transition:"width 0.6s"}}/>
          </div>
          <div style={{display:"flex",gap:8}}>
            {Object.values(RARITY).map(r=>{
              const cnt=all.filter(([w])=>getRarity(w).label===r.label).length;
              return(
                <div key={r.label} style={{flex:1,background:r.bg,border:`1.5px solid ${r.border}`,borderRadius:12,padding:"8px 6px",textAlign:"center"}}>
                  <div style={{fontSize:20,marginBottom:2}}>{r.icon}</div>
                  <div style={{fontSize:11,fontWeight:700,color:r.color}}>{r.label}</div>
                  <div style={{fontSize:16,fontWeight:800,color:C.ink}}>{cnt}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          {FILTERS.map(f=>{
            const active=f.key===filter;
            return(
              <button key={f.key} onClick={()=>setFilter(f.key)}
                style={{display:"flex",alignItems:"center",gap:5,padding:"8px 14px",borderRadius:20,
                  border:`1.5px solid ${active?C.ink:C.border}`,background:active?C.ink:C.white,
                  color:active?C.white:C.soft,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                <span>{f.icon}</span><span>{f.label}</span>
              </button>
            );
          })}
        </div>
        {filtered.length===0&&(
          <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:20,padding:"40px 20px",textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:12}}>🔍</div>
            <div style={{fontSize:15,fontWeight:600,color:C.ink,marginBottom:6}}>{all.length===0?"아직 단어가 없어요!":"이 등급 단어가 없어요"}</div>
            <div style={{fontSize:13,color:C.soft}}>{all.length===0?"지문에서 파란 밑줄 단어를 탭해서 도감을 채워봐요 📖":"다른 등급을 확인해봐요!"}</div>
          </div>
        )}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          {filtered.map(([word,data])=>{
            const r=getRarity(word);
            const isFlipped=!!flipped[word];
            return(
              <div key={word} onClick={()=>setFlipped(prev=>({...prev,[word]:!prev[word]}))}
                style={{background:isFlipped?r.bg:C.white,border:`2px solid ${isFlipped?r.border:C.border}`,borderRadius:16,padding:"14px 10px",textAlign:"center",cursor:"pointer",transition:"all 0.2s",minHeight:120,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,boxShadow:isFlipped?`0 4px 16px ${r.border}60`:"none"}}>
                {!isFlipped?(
                  <>
                    <div style={{fontSize:28,marginBottom:2}}>{r.icon}</div>
                    <div style={{fontSize:14,fontWeight:800,color:C.ink,wordBreak:"break-word"}}>{word}</div>
                    <div style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,background:r.bg,color:r.color,border:`1.5px solid ${r.border}`}}>{r.icon} {r.label}</div>
                  </>
                ):(
                  <>
                    <div style={{fontSize:18,marginBottom:2}}>{r.icon}</div>
                    <div style={{fontSize:13,fontWeight:800,color:C.ink,marginBottom:4,wordBreak:"break-word"}}>{word}</div>
                    <div style={{fontSize:12,color:C.soft,lineHeight:1.5,textAlign:"center",padding:"0 4px"}}>{data.meaning||"뜻 로딩 중..."}</div>
                    <div style={{marginTop:4,fontSize:11,fontWeight:700,color:data.status==="완료"?C.greenText:"#9CA3AF",background:data.status==="완료"?C.greenBg:"#F3F4F6",padding:"3px 10px",borderRadius:20}}>{data.status==="완료"?"✓ 완료":"기억 중"}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── 캐릭터 선택 ───────────────────────────────────────────────────────
function CharacterPicker({onSelect}){
  const [selected,setSelected]=useState(null);
  return(
    <div style={{minHeight:"100vh",background:"#FFF9F0",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{maxWidth:420,width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:52,marginBottom:10}}>📖</div>
          <div style={{fontSize:28,fontWeight:800,color:C.ink,letterSpacing:"-1px"}}>WordDex</div>
          <div style={{fontSize:15,color:C.soft,marginTop:8}}>함께할 친구를 골라봐요! 🎉</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:24}}>
          {Object.entries(CHARACTERS).map(([key,ch])=>(
            <div key={key} onClick={()=>setSelected(key)}
              style={{background:selected===key?ch.bg:C.white,border:`3px solid ${selected===key?ch.color:C.border}`,borderRadius:20,padding:"22px 10px",textAlign:"center",cursor:"pointer",transition:"all 0.18s",transform:selected===key?"translateY(-4px) scale(1.03)":"none",boxShadow:selected===key?`0 8px 24px ${ch.color}30`:"none"}}>
              <div style={{fontSize:48,marginBottom:10,lineHeight:1}}>{ch.emoji}</div>
              <div style={{fontSize:15,fontWeight:700,color:C.ink,marginBottom:4}}>{ch.name}</div>
              <div style={{fontSize:11,color:C.soft,lineHeight:1.4}}>{ch.labels[0]}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>selected&&onSelect(selected)} disabled={!selected}
          style={{width:"100%",padding:"14px 0",borderRadius:16,border:"none",fontSize:16,fontWeight:700,fontFamily:"inherit",cursor:selected?"pointer":"default",background:selected?C.ink:"#E5E7EB",color:selected?C.white:"#9CA3AF",transition:"all 0.2s"}}>
          {selected?`${CHARACTERS[selected].name}와 시작하기! →`:"캐릭터를 골라봐요"}
        </button>
        <div style={{textAlign:"center",fontSize:12,color:C.soft,marginTop:12}}>나중에 바꿀 수 있어요 😊</div>
      </div>
    </div>
  );
}

// ── 퀴즈 컴포넌트들 ───────────────────────────────────────────────────
const card2={border:`1px solid ${C.border}`,borderRadius:12,padding:16,background:"#F7F6F2"};

function MCQuiz({q,isLast,onNext}){
  const [chosen,setChosen]=useState(null);
  const done=chosen!==null;
  return(
    <div style={card2}>
      <Tag type="mc"/>
      <div style={{fontSize:14,fontWeight:600,color:C.ink,marginBottom:14,lineHeight:1.6}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {q.opts.map((o,i)=>{
          const isC=done&&i===q.answer, isW=done&&i===chosen&&i!==q.answer;
          return(<button key={i} disabled={done} onClick={()=>setChosen(i)}
            style={{textAlign:"left",display:"flex",gap:10,alignItems:"flex-start",padding:"10px 12px",borderRadius:8,fontSize:13,fontFamily:"inherit",cursor:done?"default":"pointer",border:`1px solid ${isC?C.green:isW?C.red:C.border}`,background:isC?C.greenBg:isW?C.redBg:C.white,color:isC?C.greenText:isW?C.redText:C.ink}}>
            <span style={{fontWeight:700,minWidth:20,flexShrink:0,color:isC?C.greenText:isW?C.redText:C.soft}}>{String.fromCharCode(65+i)}</span>
            <span>{o}</span>
          </button>);
        })}
      </div>
      {done&&<div style={{marginTop:12,padding:"10px 12px",background:C.white,borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,color:C.soft,lineHeight:1.6}}>{q.fb}</div>}
      {done&&<div style={{marginTop:12}}><Btn variant="primary" full onClick={onNext}>{isLast?"결과 보기 →":"다음 문제 →"}</Btn></div>}
    </div>
  );
}

function OXQuiz({q,isLast,onNext}){
  const [chosen,setChosen]=useState(null);
  const done=chosen!==null;
  return(
    <div style={card2}>
      <Tag type="ox"/>
      <div style={{fontSize:14,fontWeight:600,color:C.ink,marginBottom:14,lineHeight:1.6}}>{q.q}</div>
      <div style={{display:"flex",gap:10}}>
        {["O","X"].map(v=>{
          const isC=done&&v===q.answer, isW=done&&v===chosen&&v!==q.answer;
          return(<button key={v} disabled={done} onClick={()=>setChosen(v)}
            style={{flex:1,padding:"14px 0",fontSize:24,fontFamily:"inherit",cursor:done?"default":"pointer",borderRadius:10,border:`1px solid ${isC?C.green:isW?C.red:C.border}`,background:isC?C.greenBg:isW?C.redBg:C.white}}>
            {v}
          </button>);
        })}
      </div>
      {done&&<div style={{marginTop:12,padding:"10px 12px",background:C.white,borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,color:C.soft,lineHeight:1.6}}>{q.fb}</div>}
      {done&&<div style={{marginTop:12}}><Btn variant="primary" full onClick={onNext}>{isLast?"결과 보기 →":"다음 문제 →"}</Btn></div>}
    </div>
  );
}

const SYS_OPEN="You are a warm English reading tutor for Korean elementary students. Give warm 2-sentence feedback in Korean. Acknowledge what the child said, add a gentle insight. Mix in simple English. Start with an emoji.";

function OpenQuiz({q,isLast,onNext}){
  const [val,setVal]=useState(""); const [fb,setFb]=useState(""); const [loading,setLoading]=useState(false); const [submitted,setSubmitted]=useState(false);
  const submit=async()=>{
    if(!val.trim())return; setSubmitted(true);setLoading(true);
    try{const text=await callClaude([{role:"user",content:`Question: "${q.q}"\nAnswer: "${val}"`}],SYS_OPEN,180);setFb(text);}
    catch{setFb("오류가 났지만 잘 썼어요! 😊");}
    setLoading(false);
  };
  return(
    <div style={card2}>
      <Tag type="open"/>
      <div style={{fontSize:14,fontWeight:600,color:C.ink,marginBottom:12,lineHeight:1.6}}>{q.q}</div>
      <textarea value={val} onChange={e=>setVal(e.target.value)} disabled={submitted} placeholder="자유롭게 써봐요 (한국어 또는 영어)..." rows={3}
        style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px",fontSize:13,fontFamily:"inherit",resize:"none",outline:"none",lineHeight:1.6,background:submitted?"#F7F6F2":C.white}}/>
      {!submitted&&<div style={{marginTop:8}}><Btn onClick={submit} disabled={!val.trim()}>제출</Btn></div>}
      {loading&&<div style={{fontSize:12,color:C.soft,marginTop:10}}>AI 친구가 읽고 있어요...</div>}
      {fb&&<div style={{marginTop:10,padding:"10px 12px",background:C.white,borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,color:C.soft,lineHeight:1.6}}>{fb}</div>}
      {fb&&<div style={{marginTop:12}}><Btn variant="primary" full onClick={onNext}>{isLast?"결과 보기 →":"다음 문제 →"}</Btn></div>}
    </div>
  );
}

function QuizRunner({storyId,onDone}){
  const [questions]=useState(()=>buildQuiz(storyId));
  const [curQ,setCurQ]=useState(0);
  const [done,setDone]=useState(false);
  if(!questions||questions.length===0) return(<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:13,color:C.soft,marginBottom:12}}>퀴즈를 불러올 수 없어요.</div><Btn onClick={onDone}>돌아가기</Btn></div>);
  if(done) return(<div style={{textAlign:"center",padding:"24px 0"}}><div style={{fontSize:40,marginBottom:10}}>🎉</div><div style={{fontSize:15,fontWeight:600,color:C.ink,marginBottom:6}}>퀴즈 완료!</div><div style={{fontSize:13,color:C.soft,marginBottom:20}}>이야기를 잘 이해했어요.</div><Btn variant="primary" size="lg" onClick={onDone}>홈으로 →</Btn></div>);
  const q=questions[curQ], isLast=curQ===questions.length-1;
  const next=()=>{ if(isLast)setDone(true); else setCurQ(c=>c+1); };
  return(<>
    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:14}}>
      {questions.map((_,i)=>(<div key={i} style={{width:8,height:8,borderRadius:"50%",transition:"background 0.3s",background:i<curQ?C.purple:i===curQ?C.blue:C.border}}/>))}
      <span style={{fontSize:11,color:C.soft,marginLeft:"auto"}}>{curQ+1} / {questions.length}</span>
    </div>
    {q.type==="mc"&&<MCQuiz key={`q-${curQ}`} q={q} isLast={isLast} onNext={next}/>}
    {q.type==="ox"&&<OXQuiz key={`q-${curQ}`} q={q} isLast={isLast} onNext={next}/>}
    {q.type==="open"&&<OpenQuiz key={`q-${curQ}`} q={q} isLast={isLast} onNext={next}/>}
  </>);
}

// ── 메인 앱 ──────────────────────────────────────────────────────────
export default function Home(){
  const [mounted,setMounted]=useState(false);
  const [character,setCharacter]=useState(null);
  const [level,setLevel]=useState(null);
  const [story,setStory]=useState(null);
  const [view,setView]=useState("home");
  const [selectedWord,setSelectedWord]=useState(null);
  const [showTrans,setShowTrans]=useState(false);
  const [showQuiz,setShowQuiz]=useState(false);
  const [vocab,setVocab]=useState({});
  const [stars,setStars]=useState(0);
  const [newWordAnim,setNewWordAnim]=useState(null);
  const [confirmChange,setConfirmChange]=useState(false);

  // SSR 방지 — localStorage는 클라이언트에서만
  useEffect(()=>{
    const ls=loadLS();
    setCharacter(ls.character||null);
    setLevel(ls.level||null);
    setVocab(ls.vocab||{});
    setStars(ls.stars||0);
    setMounted(true);
  },[]);

  useEffect(()=>{
    if(mounted) saveLS({character,level,vocab,stars});
  },[character,level,vocab,stars,mounted]);

  const earnStars=(n)=>setStars(s=>s+n);

  const saveVocab=(word,meaning)=>{
    setVocab(prev=>{
      const isNew=!prev[word];
      const updated={...prev,[word]:{...prev[word],meaning:meaning||prev[word]?.meaning||"",status:prev[word]?.status||"기억 중"}};
      if(isNew){ earnStars(3); setNewWordAnim(word); setTimeout(()=>setNewWordAnim(null),2200); }
      return updated;
    });
  };

  const toggleVocab=word=>{
    setVocab(prev=>({...prev,[word]:{...prev[word],status:prev[word]?.status==="완료"?"기억 중":"완료"}}));
    earnStars(1);
  };

  const openStory=s=>{
    setStory(s); setShowTrans(false); setShowQuiz(false); setView("read");
  };

  if(!mounted) return <div style={{minHeight:"100vh",background:"#FFF9F0",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{fontSize:40}}>📖</div></div>;
  if(!character) return <CharacterPicker onSelect={k=>setCharacter(k)}/>;
  if(view==="dex") return <WordDex vocab={vocab} onClose={()=>setView(story?"read":"home")}/>;
  if(view==="vocab") return <VocabBook vocabData={vocab} onToggle={toggleVocab} onClose={()=>setView(story?"read":"home")}/>;

  const ch=CHARACTERS[character]||CHARACTERS.fox;
  const stage=getStage(stars);
  const nextGoal=getNextGoal(stars);
  const tokens=story?parseStory(story.raw):[];
  const vocabInStory=story?Object.keys(vocab).filter(w=>story.vocab.includes(w)):[];
  const S={background:C.white,border:`1px solid ${C.border}`,borderRadius:20,padding:20,marginBottom:14};

  return(
    <div style={{background:"#FFF9F0",minHeight:"100vh"}}>
      {/* 새 단어 토스트 */}
      {newWordAnim&&(
        <div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",zIndex:500,background:C.ink,color:C.white,padding:"12px 22px",borderRadius:24,fontSize:14,fontWeight:700,boxShadow:"0 6px 24px rgba(0,0,0,0.18)",whiteSpace:"nowrap"}}>
          ✨ 새 단어 발견! <span style={{color:"#FCD34D"}}>"{newWordAnim}"</span> +3⭐
        </div>
      )}

      {selectedWord&&<WordPopup word={selectedWord} onClose={()=>setSelectedWord(null)} onSaveVocab={saveVocab}/>}

      <div style={{maxWidth:640,margin:"0 auto",padding:"16px 16px 80px"}}>
        {/* 헤더 */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {view==="read"&&(
              <button onClick={()=>{setView("home");setStory(null);setShowQuiz(false);}}
                style={{border:`1px solid ${C.border}`,borderRadius:12,padding:"8px 14px",fontSize:13,fontWeight:600,background:C.white,cursor:"pointer",fontFamily:"inherit"}}>←</button>
            )}
            <div style={{fontSize:20,fontWeight:800,color:C.ink,letterSpacing:"-0.5px"}}>WordDex 📖</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{background:"#FFFBEB",border:"1.5px solid #FCD34D",borderRadius:20,padding:"5px 12px",fontSize:13,fontWeight:700,color:"#D97706"}}>⭐ {stars}</div>
            <button onClick={()=>setView("dex")} style={{border:`1px solid ${C.border}`,borderRadius:20,padding:"7px 14px",fontSize:13,fontWeight:600,background:C.white,cursor:"pointer",fontFamily:"inherit"}}>
              🗂 도감{Object.keys(vocab).length>0?` (${Object.keys(vocab).length})`:""}
            </button>
            <button onClick={()=>setView("vocab")} style={{border:`1px solid ${C.purpleBg}`,borderRadius:20,padding:"7px 14px",fontSize:13,fontWeight:600,background:C.purpleBg,cursor:"pointer",fontFamily:"inherit",color:C.purpleText}}>📚</button>
          </div>
        </div>

        {/* 홈 */}
        {view==="home"&&(
          <>
            {/* 캐릭터 카드 */}
            <div style={{...S,background:`linear-gradient(135deg,${ch.bg},#EFF6FF)`,border:`2px solid ${ch.color}30`,padding:22}}>
              <div style={{display:"flex",alignItems:"center",gap:18}}>
                <div style={{fontSize:60,lineHeight:1}}>{ch.stages[stage]}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:700,color:ch.color,marginBottom:3}}>{ch.name} · {ch.labels[stage]}</div>
                  <div style={{fontSize:20,fontWeight:800,color:C.ink,marginBottom:10}}>⭐ {stars}개</div>
                  {nextGoal?(
                    <>
                      <div style={{height:8,background:`${ch.color}20`,borderRadius:8,overflow:"hidden",marginBottom:5}}>
                        <div style={{height:"100%",width:`${Math.min(stars/nextGoal*100,100)}%`,background:ch.color,borderRadius:8,transition:"width 0.6s"}}/>
                      </div>
                      <div style={{fontSize:12,color:C.soft}}>다음 레벨까지 {nextGoal-stars}⭐ 남았어요!</div>
                    </>
                  ):(
                    <div style={{fontSize:13,fontWeight:700,color:ch.color}}>🎉 최고 단계 달성!</div>
                  )}
                </div>
                {!confirmChange?(
                  <button onClick={()=>setConfirmChange(true)}
                    style={{border:`1px solid ${C.border}`,borderRadius:10,padding:"6px 10px",fontSize:11,background:C.white,cursor:"pointer",fontFamily:"inherit",color:C.soft,flexShrink:0}}>
                    변경
                  </button>
                ):(
                  <div style={{display:"flex",flexDirection:"column",gap:6,flexShrink:0}}>
                    <div style={{fontSize:11,color:C.soft,textAlign:"center",marginBottom:2}}>바꿀까요?</div>
                    <button onClick={()=>{ setConfirmChange(false); setTimeout(()=>setCharacter(null),50); }}
                      style={{border:"none",borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:700,background:C.red,color:C.white,cursor:"pointer",fontFamily:"inherit"}}>
                      바꾸기
                    </button>
                    <button onClick={()=>setConfirmChange(false)}
                      style={{border:`1px solid ${C.border}`,borderRadius:8,padding:"5px 12px",fontSize:12,background:C.white,cursor:"pointer",fontFamily:"inherit",color:C.soft}}>
                      취소
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 레벨 선택 */}
            <div style={S}>
              <div style={{fontSize:15,fontWeight:700,color:C.ink,marginBottom:14}}>레벨 선택</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10}}>
                {[1,2,3,4].map(lv=>(
                  <button key={lv} onClick={()=>setLevel(lv)}
                    style={{padding:"14px 0",borderRadius:14,fontSize:15,fontWeight:700,fontFamily:"inherit",cursor:"pointer",border:`2px solid ${level===lv?C.ink:C.border}`,background:level===lv?C.ink:C.white,color:level===lv?C.white:C.soft,transition:"all 0.15s"}}>
                    Lv.{lv}
                  </button>
                ))}
              </div>
              {level&&<div style={{marginTop:10,fontSize:13,color:C.soft}}>{LEVEL_DESC[level]}</div>}
            </div>

            {/* 지문 목록 */}
            {level&&(
              <>
                <div style={{fontSize:15,fontWeight:700,color:C.soft,marginBottom:10}}>Lv.{level} 지문</div>
                {(STORIES[level]||[]).map(s=>{
                  const found=Object.keys(vocab).filter(w=>s.vocab.includes(w)).length;
                  const complete=found===s.vocab.length;
                  return(
                    <div key={s.id} onClick={()=>openStory(s)}
                      style={{...S,cursor:"pointer",display:"flex",alignItems:"center",gap:16,marginBottom:10,border:`1.5px solid ${complete?"#86EFAC":C.border}`,background:complete?"#F0FDF4":C.white}}>
                      <div style={{width:52,height:52,borderRadius:14,background:complete?C.greenBg:C.blueBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0}}>{complete?"✅":"📖"}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:15,fontWeight:700,color:C.ink,marginBottom:6}}>{s.title}</div>
                        <div style={{height:6,background:"#F3F4F6",borderRadius:4,overflow:"hidden",marginBottom:4}}>
                          <div style={{height:"100%",width:`${found/s.vocab.length*100}%`,background:complete?C.green:C.blue,borderRadius:4,transition:"width 0.4s"}}/>
                        </div>
                        <div style={{fontSize:12,color:C.soft}}>단어 {found}/{s.vocab.length}개 발견</div>
                      </div>
                      <span style={{fontSize:20,color:C.soft}}>›</span>
                    </div>
                  );
                })}
              </>
            )}
            {!level&&(
              <div style={{textAlign:"center",padding:"32px 0"}}>
                <div style={{fontSize:48,marginBottom:12}}>👆</div>
                <div style={{fontSize:15,color:C.soft}}>레벨을 선택하면 지문이 나타나요!</div>
              </div>
            )}
          </>
        )}

        {/* 읽기 */}
        {view==="read"&&story&&(
          <>
            <div style={S}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,gap:8,flexWrap:"wrap"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:12,fontWeight:700,padding:"4px 12px",borderRadius:20,background:C.blueBg,color:C.blueText}}>Lv.{level}</span>
                  <span style={{fontSize:12,color:C.soft}}>{vocabInStory.length}/{story.vocab.length} 단어 발견</span>
                </div>
                <button onClick={()=>setShowTrans(v=>!v)}
                  style={{border:`1.5px solid ${showTrans?"#FCD34D":C.border}`,borderRadius:20,padding:"6px 14px",fontSize:12,fontWeight:600,background:showTrans?"#FFFBEB":C.white,color:showTrans?"#D97706":C.soft,cursor:"pointer",fontFamily:"inherit"}}>
                  🇰🇷 {showTrans?"해석 닫기":"한글 해석"}
                </button>
              </div>
              <div style={{fontSize:17,fontWeight:800,color:C.ink,marginBottom:16}}>{story.title}</div>
              <div style={{fontSize:15,lineHeight:2.1,color:C.ink}}>
                {tokens.map(tok=>
                  tok.type==="vocab"
                    ?<span key={tok.key} onClick={()=>setSelectedWord(tok.word)}
                        style={{cursor:"pointer",borderBottom:`2.5px ${vocabInStory.includes(tok.word)?"solid":"dashed"} ${C.blue}`,padding:"0 2px",background:vocabInStory.includes(tok.word)?C.blueBg:"transparent",borderRadius:4,fontWeight:vocabInStory.includes(tok.word)?700:400}}>
                        {tok.display}
                      </span>
                    :<span key={tok.key}>{tok.text}</span>
                )}
              </div>
              {showTrans&&(
                <div style={{borderTop:`1.5px dashed ${C.border}`,marginTop:16,paddingTop:16}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#D97706",marginBottom:8}}>🇰🇷 한글 해석</div>
                  <div style={{fontSize:14,color:C.soft,lineHeight:2}}>{story.translation}</div>
                </div>
              )}
              <div style={{fontSize:12,color:"#9CA3AF",marginTop:14}}>💡 파란 밑줄 단어를 탭하면 발음과 뜻을 확인할 수 있어요</div>
            </div>

            {vocabInStory.length>0&&(
              <div style={S}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                  <div style={{fontSize:14,fontWeight:700,color:C.ink}}>발견한 단어 {vocabInStory.length}/{story.vocab.length}</div>
                  <button onClick={()=>setView("dex")} style={{border:`1px solid ${C.border}`,borderRadius:20,padding:"5px 12px",fontSize:12,fontWeight:600,background:C.white,cursor:"pointer",fontFamily:"inherit"}}>도감 보기 →</button>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {vocabInStory.map(w=>{
                    const r=getRarity(w);
                    return(<span key={w} onClick={()=>setSelectedWord(w)}
                      style={{fontSize:13,fontWeight:700,padding:"6px 14px",borderRadius:20,cursor:"pointer",border:`2px solid ${r.border}`,color:r.color,background:r.bg,display:"inline-flex",alignItems:"center",gap:4}}>
                      {r.icon} {w}
                    </span>);
                  })}
                </div>
              </div>
            )}

            <div style={S}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                <div style={{width:36,height:36,borderRadius:"50%",background:ch.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,border:`2px solid ${ch.color}40`}}>{ch.stages[stage]}</div>
                <div style={{fontSize:16,fontWeight:700,color:C.ink}}>AI 독서 퀴즈</div>
              </div>
              {!showQuiz?(
                <div style={{textAlign:"center",padding:"16px 0 8px"}}>
                  <div style={{fontSize:40,marginBottom:10}}>{ch.emoji}</div>
                  <p style={{fontSize:14,color:C.soft,marginBottom:20,lineHeight:1.8}}>이야기를 다 읽었나요?<br/>퀴즈를 완료하면 {ch.name}이(가) 성장해요! ⭐</p>
                  <button onClick={()=>setShowQuiz(true)}
                    style={{background:C.ink,color:C.white,border:"none",borderRadius:16,padding:"14px 32px",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                    퀴즈 시작하기 🚀
                  </button>
                </div>
              ):(
                <QuizRunner storyId={story.id} onDone={()=>{ earnStars(10); setView("home"); setStory(null); setShowQuiz(false); }}/>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
