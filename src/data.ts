export interface LanguageGuideItem {
  phrase: string;
  vietnamese: string;
  example: string;
}

export interface CEFRLevelGuide {
  title: string;
  badge: string;
  color: string;
  vietnameseSummary: string;
  goals: string[];
  vocabulary: LanguageGuideItem[];
  transitions: LanguageGuideItem[];
  structures: { pattern: string; description: string; example: string }[];
}

export interface ModelAnswer {
  level: string;
  clout: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  wordCount: number;
  text: string;
  analysis_en: string[];
  analysis_vi: string[];
}

export const VSTEP_TASK_PROMPT = {
  title: "Friend's Reply: Mary's Email",
  sender: "Mary (mary.oxford91@gmail.com)",
  recipient: "you@vstep-learner.vn",
  subject: "Do you remember me?",
  date: "June 22, 2026",
  emailBody: `Do you remember me? We met when you visited my high school in Oxford during your summer trip to England 3 years ago. We haven’t heard from each other for a long time, right? Anyway, how are you? What have you been doing? You always wanted to be a teacher!

Here some of my news. I’m studying Laws at Oxford University. I think I have changed a lot over the years. I don’t like thrillers any more. I prefer history books now. Do you remember Pete, the tall thin guy with glasses? He’s on the same course as me. We are best friends now!

Well, I must finish now because I have an exam tomorrow. It would be really good if we could get together again.

Write back soon and tell me all your news.
Mary.`
};

export const CEFR_GUIDELINES: Record<string, CEFRLevelGuide> = {
  B1: {
    title: "B1 · Threshold Level",
    badge: "VSTEP Level 3",
    color: "from-blue-500 to-indigo-600",
    vietnameseSummary: "Trình độ Cơ Bản (Mức Đạt): Đạt yêu cầu truyền tải thông tin chính xác, câu đơn và ghép cơ bản, từ vựng vừa đủ.",
    goals: [
      "Trả lời đầy đủ cả 3 yêu cầu của đề bài (Task Fulfillment).",
      "Sử dụng các cấu trúc thời thì cơ bản (Simple Past, Present Perfect/Simple) một cách chính xác.",
      "Viết ít nhất 120 từ, bài viết mạch lạc, rõ bố cục 3 phần chính.",
      "Có lỗi ngữ pháp nhẹ không làm ảnh hưởng đến việc hiểu nghĩa bức thư."
    ],
    vocabulary: [
      { phrase: "receive your email", vietnamese: "nhận thư của bạn", example: "I was very glad to receive your email." },
      { phrase: "remember well", vietnamese: "nhớ rõ", example: "I still remember you and your school very well." },
      { phrase: "summer trip", vietnamese: "chuyến đi mùa hè", example: "I will never forget my summer trip to England 3 years ago." },
      { phrase: "study to be physical/English teacher", vietnamese: "học để trở thành giáo viên", example: "Now I am studying at university to be an English teacher." },
      { phrase: "send regards to", vietnamese: "gửi lời hỏi thăm tới", example: "Please send my regards to Pete." }
    ],
    transitions: [
      { phrase: "And / But", vietnamese: "Và / Nhưng (nối ý đơn)", example: "I remember Oxford and it was very beautiful." },
      { phrase: "Because", vietnamese: "Bởi vì", example: "I must write to you because I am free now." },
      { phrase: "As for my news", vietnamese: "Về phần tin tức của mình", example: "As for my news, I am working in a big primary school." },
      { phrase: "Anyway", vietnamese: "Dù sao thì", example: "Anyway, how have you been?" }
    ],
    structures: [
      { pattern: "I was glad to get your email", description: "Mở đầu thư thân mật", example: "I was so glad to get your email yesterday." },
      { pattern: "Of course I still remember [X]", description: "Xác nhận nhớ người/vật", example: "Of course I still remember you and Pete!" },
      { pattern: "Please ask Pete/X for me", description: "Hỏi thăm người khác", example: "Please say hello to Pete for me." }
    ]
  },
  B2: {
    title: "B2 · Independent Level",
    badge: "VSTEP Level 4",
    color: "from-amber-500 to-orange-600",
    vietnameseSummary: "Trình độ Khá (Vantage): Sử dụng liên từ linh hoạt, từ vựng đa dạng, so sánh, lập luận rõ ràng, cấu trúc câu phức tạp hơn.",
    goals: [
      "Lồng ghép các chi tiết tự nhiên để bức thư sinh động hơn.",
      "Sử dụng các từ nối nâng cao (whereas, while, in terms of, by contrast).",
      "Sử dụng cụm động từ (Phrasal Verbs) và Idioms nhẹ nhàng phù hợp văn phong hằng ngày.",
      "Khả năng kiểm soát ngữ pháp tương đối tốt, hầu như không có lỗi sai cơ bản."
    ],
    vocabulary: [
      { phrase: "recollect vividly", vietnamese: "nhớ lại một cách sinh động", example: "I vividly recollect our wonderful meeting at your high school." },
      { phrase: "time flies", vietnamese: "thì giờ thấm thoát trôi mau", example: "Time truly flies, as it has already been three years." },
      { phrase: "passion/dream realization", vietnamese: "hiện thực hóa ước mơ", example: "Becoming a teacher is a dream realization for me." },
      { phrase: "pursue a law degree", vietnamese: "theo đuổi bằng ngành Luật", example: "It is wonderful that you are pursuing a law degree at Oxford." },
      { phrase: "convey my warm greetings", vietnamese: "gửi lời chào ấm áp", example: "Please convey my warm greetings to Pete." }
    ],
    transitions: [
      { phrase: "Speaking of Pete / Regarding X", vietnamese: "Khi nói về Pete / Về X", example: "Regarding Pete, I remember him as a tall, friendly guy." },
      { phrase: "In spite of / Although", vietnamese: "Mặc dù", example: "Although teaching is hard work, I find it highly rewarding." },
      { phrase: "By contrast / On the other hand", vietnamese: "Ngược lại / Mặt khác", example: "On the other hand, my sister prefers thrillers." },
      { phrase: "Furthermore", vietnamese: "Hơn thế nữa", example: "Furthermore, the environment here is very supportive." }
    ],
    structures: [
      { pattern: "It was a wonderful surprise to hear...", description: "Cụm mở đầu biểu cảm cao", example: "It was a wonderful surprise to hear from you after such a long time!" },
      { pattern: "My memory of [X] is still fresh/intact", description: "Bày tỏ ký ức sâu sắc", example: "My memory of visiting your high school in Oxford is still completely intact." },
      { pattern: "Pass on my warmest regards to...", description: "Hỏi thăm trang trọng nhưng ấm áp", example: "Please pass on my warmest regards to Pete when you see him." }
    ]
  },
  C1: {
    title: "C1 · Proficient Level",
    badge: "VSTEP Level 5",
    color: "from-emerald-600 to-teal-700",
    vietnameseSummary: "Trình độ Cao Cấp (Effective Proficiency): Sử dụng từ vựng nâng cao một cách uyển chuyển tự nhiên, văn phong tinh tế, có chiều sâu cảm xúc.",
    goals: [
      "Văn phong vô cùng tự nhiên, gần gũi nhưng cực kỳ trau chuốt (idiomatic and fluent flow).",
      "Sử dụng đa dạng các cấu trúc giả định hoặc phân từ (Having + V3, Subjunctive, Inversion).",
      "Nâng tầm các câu trả lời cơ bản bằng cách kết nối ý tưởng phức tạp, từ vựng có tính học thuật cao (indelible impression, academic pursuits).",
      "Hầu như không mắc bất cứ lỗi ngữ pháp hoặc lỗi chính tả nào."
    ],
    vocabulary: [
      { phrase: "delighted beyond words", vietnamese: "vui mừng khôn xiết", example: "I was delighted beyond words to receive your email." },
      { phrase: "leave an indelible impression", vietnamese: "để lại ấn tượng không thể phai mờ", example: "Your high school and friendly peers left an indelible impression on me." },
      { phrase: "embarked on my professional journey", vietnamese: "bắt đầu hành trình sự nghiệp", example: "I have finally embarked on my professional journey as a high school instructor." },
      { phrase: "rigorous academic course", vietnamese: "khóa học học thuật khắt khe", example: "It is great to hear Pete is on the same rigorous course." },
      { phrase: "convey my heartfelt regards", vietnamese: "gửi lời chúc chân thành từ tận đáy lòng", example: "Please convey my heartfelt regards to Pete and congratulate him." }
    ],
    transitions: [
      { phrase: "With reference to / Speaking of", vietnamese: "Liên quan đến / Nhắc tới", example: "With reference to my career, I've been actively lecturing." },
      { phrase: "Exhausting as it is, ...", vietnamese: "Cấu trúc đảo ngữ nhượng bộ", example: "Exhausting as teaching is, I cannot imagine doing anything else." },
      { phrase: "In hindsight", vietnamese: "Nhìn nhận lại quá khứ", example: "In hindsight, that trip to Oxford shaped my outlook immensely." },
      { phrase: "In much the same way", vietnamese: "Theo cùng một cách tương tự", example: "In much the same way, Pete was always an excellent companion." }
    ],
    structures: [
      { pattern: "What an absolute delight to find your letter...", description: "Cảm thán trang nhã mở đầu", example: "What an absolute delight it was to find your letter in my inbox!" },
      { pattern: "Having recollected our brief encounter...", description: "Sử dụng phân từ hoàn thành chỉ thời gian", example: "Having recollected our brief encounter three years ago, I felt a deep wave of nostalgia." },
      { pattern: "Remember X as if it were yesterday", description: "Nhớ chuyện như vừa mới hôm qua", example: "I still remember my short visit to Oxford as if it were only yesterday." }
    ]
  }
};

export const MODEL_ESSAYS: ModelAnswer[] = [
  {
    level: "B1",
    clout: "B1 Standard (~Band 5.0 VSTEP)",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    wordCount: 132,
    text: `Dear Mary,

I am very happy to receive your email. Of course I still remember you! We had a wonderful time when I visited your high school in Oxford during my summer trip in England 3 years ago. I still remember the beautiful old buildings of your school.

I have some news for you. Now, I am studying to be an English teacher at a famous university in Vietnam. My life is very busy because I have many classes and exams, but it is very interesting. I also teach some children in my free time.

In your email, you mentioned Pete. He is the tall, thin guy with glasses, right? I remember him well. Please send my regards to Pete and say hello to him. 

I hope we can meet again soon. Write back to me.

Love,
Lan`,
    analysis_en: [
      "Task Achievement: Fully addresses all three prompts: remembers Mary/school, tells teacher career updates, and sends regards to Pete.",
      "Coherence: Standard paragraphing matching the introduction, my news, Pete, and friendly closing.",
      "Grammar & Lexicon: Uses basic simple past ('visited', 'had') and simple present ('am', 'is', 'have'). Vocabulary is clear and straightforward, with some repetitions like 'very' and 'remember'."
    ],
    analysis_vi: [
      "Hoàn thành nhiệm vụ: Thư trả lời đầy đủ cả 3 gợi ý từ email của Mary: nhớ trường, báo tin công việc làm giáo viên, hỏi thăm Pete.",
      "Tính liên kết: Chia đoạn khoa học, rành mạch. Mỗi đoạn phục vụ một mục đích thông tin cụ thể.",
      "Ngữ pháp & Từ vựng: Sử dụng chính xác thì quá khứ đơn giản và hiện tại đơn. Từ vựng dễ hiểu, cấu trúc câu đơn giản thích hợp với mục tiêu B1."
    ]
  },
  {
    level: "B2",
    clout: "B2 Upper-Intermediate (~Band 6.5 VSTEP)",
    textColor: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    wordCount: 168,
    text: `Dear Mary,

It was wonderful to hear from you after such a long time! How have you been? 

Of course, I still clearly remember you and our exciting meeting when I visited your high school in Oxford during my summer trip three years ago. Time truly flies, doesn't it? Visiting your school was one of the highlights of my journey in England.

As for my news, my dream of becoming a teacher has finally come true. I am currently working as an English teacher at a public high school in Hanoi. Although teaching students can be quite demanding and exhausting, I find it incredibly rewarding.

I am also thrilled to hear that you are studying Law at Oxford University! It is amazing that you and Pete are best friends now. I definitely remember him—the tall, thin guy with glasses who was very kind to me. Please send my warm regards to Pete and tell him I wish him the best.

I hope we can arrange to get together again soon. Take care!

Warmly,
Lan`,
    analysis_en: [
      "Task Achievement: Fully details the visit highlights, shares detailed teaching updates, and conveys warm greetings to Pete.",
      "Coherence & Cohesion: Uses advanced cohesive phrases like 'As for my news', 'Although', 'Of course', and rhetorical questions ('How have you been?', 'Time truly flies, doesn't it?').",
      "Vocabulary: Implements rich descriptive words ('memorable', 'highlights of my journey', 'demanding and exhausting', 'incredibly rewarding', 'thrilled to hear')."
    ],
    analysis_vi: [
      "Hoàn thành nhiệm vụ: Rất tự nhiên, lồng ghép cảm xúc của tác giả, đáp ứng đầy đủ và sâu sắc các yêu cầu của đề.",
      "Mạch lạc & Liên kết: Sử dụng các từ chuyển tiếp tự nhiên ('As for my news', 'Although') và dùng câu hỏi tu từ để tăng tính tương tác thân mật của email.",
      "Từ vựng & Ngữ pháp: Từ vựng phong phú, sử dụng chính xác các cụm từ đắt giá ('incredibly rewarding', 'highlights of my journey'). Cấu trúc phức kết hợp mệnh đề trạng ngữ chỉ sự nhượng bộ tốt."
    ]
  },
  {
    level: "C1",
    clout: "C1 Advanced / Proficient (~Band 8.0 VSTEP)",
    textColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    wordCount: 204,
    text: `Dearest Mary,

What an absolute delight it was to find your email in my inbox! It has indeed been far too long, and I often look back on our brief encounter with great fondness. 

I still recollect our high school visit in Oxford three years ago as if it were yesterday. The vibrant atmosphere of your classroom and your generous, warm hospitality left an indelible impression on me.

Regarding my own updates, my lifelong aspiration to teach has finally been realized, as I am currently lecturing English literature at a prominent college in Hanoi. Juggling daily academic responsibilities is rather exhausting, yet it remains an exceptionally fulfilling endeavor. I am also extremely thrilled that you are pursuing a prestigious Law degree at Oxford; it suits your rigorous intellect perfectly.

I was equally pleased to learn about your shared course and friendship with Pete. That tall, thin fellow with glasses is simply impossible to forget! Please convey my heartfelt regards to Pete and wish him success in your upcoming exams.

Given our cherished recollections, we must certainly coordinate a reunion as soon as our schedules permit. 

Warmest regards,
Lan`,
    analysis_en: [
      "Lexical Resource: Highly sophisticated collocations ('indelible impression', 'lifelong aspiration', 'absolute delight', 'rigorous intellect', 'cherished recollections'). Highly natural and idiomatic.",
      "Grammar Range: Advanced grammar with complex adverbial clauses ('exhausting as it is', 'as if it were', passive voice, perfect participle structures) and elegant punctuation usage.",
      "Tone & Voice: Exquisite styling. The tone is highly appropriate for an intimate yet academically sophisticated correspondence."
    ],
    analysis_vi: [
      "Vốn từ vựng: Xuất sắc, sử dụng linh hoạt các thuật ngữ học thuật tinh tế phù hợp thư tín cá nhân cao cấp ('indelible impression', 'lifelong aspiration', 'rigorous intellect').",
      "Sự đa dạng Ngữ pháp: Cực kỳ phong phú, làm chủ các cấu trúc phức tạp như câu giả định ('as if it were'), phân từ, từ bổ trợ trạng ngữ nhấn mạnh ('exceptionally fulfilling').",
      "Giọng văn: Toát lên vẻ học thức, tự tin, uyển chuyển đúng chuẩn văn phong C1 thực thụ."
    ]
  }
];

export const SELF_CHECK_ITEMS = [
  { id: "word_count", text: "Bài viết đạt ít nhất 120 từ (At least 120 words)." },
  { id: "prompt_remember", text: "Đã khẳng định nhớ Mary và chuyến thăm trường trung học 3 năm trước (Remember Mary & school visit)." },
  { id: "prompt_news", text: "Đã kể về tin tức bản thân: Việc học hành hay công việc giáo viên (Tell your news/career updates)." },
  { id: "prompt_pete", text: "Đã hỏi thăm Pete - chàng trai cao gầy, đeo kính (Send regards to Pete)." },
  { id: "greeting_closing", text: "Có đầy đủ lời chào đầu thư (Dear Mary) và lời chúc, chữ ký cuối thư (Love/Regards, Lan)." },
  { id: "past_tense", text: "Sử dụng đúng thì quá khứ đơn cho các sự kiện xảy ra 3 năm trước (Correct Simple Past usage)." }
];
