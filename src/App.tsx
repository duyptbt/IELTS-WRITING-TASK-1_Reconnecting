import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  FileText, 
  CheckSquare, 
  HelpCircle, 
  User, 
  Clock, 
  Info, 
  Copy, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Mail,
  Award,
  ChevronDown,
  Check
} from "lucide-react";
import { 
  CEFR_GUIDELINES, 
  MODEL_ESSAYS, 
  SELF_CHECK_ITEMS, 
  VSTEP_TASK_PROMPT, 
  CEFRLevelGuide, 
  ModelAnswer 
} from "./data";

export default function App() {
  // Dummy definitions to support removed AI results block content
  const feedback = null;
  const feedbackRef = useRef(null);
  const copyCorrectedLetter = () => {};

  // Navigation / Tabs State
  const [activeGuideTab, setActiveGuideTab] = useState<string>("B1");
  const [activeModelTab, setActiveModelTab] = useState<string>("B2");
  
  // Writing State
  const [draftText, setDraftText] = useState<string>("");
  const [subject, setSubject] = useState<string>("Re: Do you remember me?");
  const wordCount = draftText.trim() === "" ? 0 : draftText.trim().split(/\s+/).length;
  const charCount = draftText.length;
  
  // Interactive checklist state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Handle self check toggle
  const toggleCheckItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Pre-load draft templates
  const loadTemplate = (level: 'B1' | 'B2' | 'clear') => {
    if (level === 'clear') {
      if (window.confirm("Bạn có chắc chắn muốn xóa bài viết hiện tại?")) {
        setDraftText("");
      }
      return;
    }

    const b1Template = `Dear Mary,

I am so happy to get your email yesterday! Of course I still remember you and our summer trip to Oxford 3 years ago. It was an exciting visit for me.

I have some news for you. Now, I am studying at an English university in Hanoi because I want to be a teacher in the future. Hanoi is very busy but my classes are very fun.

About Pete, I remember him very well! He is the tall, thin guy with glasses. Please say hello and send my warm regards to Pete.

Write to me soon.

Love,
[Your Name]`;

    const b2Template = `Dear Mary,

It was a wonderful surprise to hear from you after such a long time! How have you been?

Of course, I still clearly remember you and our meeting when I visited your high school in Oxford during my summer trip three years ago. Time truly flies, doesn't it? It was a beautiful memory that I will never forget.

As for my news, my dream of becoming a teacher has finally come true. I am currently working as an English teacher at a high school in Hanoi. Although teaching is quite hard, I find it incredibly rewarding.

I am also glad that you are studying Law and that Pete is on the same course as you. I remember him well—the tall thin guy who wore glasses. Please send my warm regards to him.

I hope we can get together again soon!

Warmly,
[Your Name]`;

    if (draftText.trim() !== "" && !window.confirm("Thao tác này sẽ ghi đè lên bài viết hiện tại của bạn. Bạn có muốn tiếp tục?")) {
      return;
    }

    if (level === 'B1') {
      setDraftText(b1Template);
    } else if (level === 'B2') {
      setDraftText(b2Template);
    }
  };

  // Copy helper
  const copyValue = (value: string) => {
    navigator.clipboard.writeText(value);
    alert("Đã sao chép cụm từ!");
  };

  const insertPhrase = (phrase: string) => {
    if (draftText === "") {
      setDraftText(phrase);
    } else {
      setDraftText(prev => prev + " " + phrase);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 antialiased flex flex-col pb-20">
      
      {/* ===================== HEADER ===================== */}
      <header className="bg-blue-800 text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center shadow-md border-b border-blue-900">
        <div className="flex items-center gap-4">
          <div className="bg-white text-blue-800 font-extrabold px-3 py-1 rounded text-lg font-display tracking-tight">VSTEP</div>
          <div className="h-6 w-px bg-blue-400"></div>
          <h1 className="text-xl font-bold font-display tracking-tight">English Proficiency Test - Writing Task 1</h1>
        </div>
        <div className="flex items-center gap-6 mt-3 md:mt-0">
          <div className="text-right">
            <p className="text-[10px] text-blue-200 uppercase tracking-widest leading-none">Time Recommended</p>
            <p className="text-2xl font-mono font-bold text-white mt-0.5">00:20:00</p>
          </div>
          <span className="bg-slate-500/25 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-500/35 flex items-center gap-1.5 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            Practice Mode
          </span>
        </div>
      </header>

      {/* ===================== MAIN GRID CONTAINER ===================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* ===================== SECTION 1: PROMPT EMAIL & REQUIREMENTS ===================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* Mary's mail card (Left Pane: 7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl shadow-xs border border-slate-200 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">Task Instructions</span>
                <h2 className="font-extrabold text-slate-800 font-display text-base">Letter Writing (Task 1)</h2>
              </div>
              
              <div className="text-sm leading-relaxed text-slate-700 space-y-4">
                <p className="italic text-slate-500">Your English-speaking friend, Mary, whom you haven’t met for a long time, sent you an email. Read part of her email below:</p>
                
                {/* Outlook Style Mail */}
                <div className="bg-slate-50 border-l-4 border-blue-500 p-5 rounded-r-lg shadow-3xs">
                  <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200 text-xs flex flex-col gap-1.5 font-mono mb-4 rounded-t-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">From:</span> 
                      <span className="text-slate-800 font-medium">{VSTEP_TASK_PROMPT.sender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">To:</span> 
                      <span className="text-[#1a73e8] font-semibold">{VSTEP_TASK_PROMPT.recipient}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200/50 pt-1.5 mt-1">
                      <span className="text-slate-500 font-semibold">Subject:</span> 
                      <span className="text-slate-900 font-bold">{VSTEP_TASK_PROMPT.subject}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 font-sans leading-relaxed text-slate-800 text-xs sm:text-sm whitespace-pre-line">
                    Do you remember me? We met when you visited my high school in <span className="bg-amber-100 text-amber-800 px-1 py-0.5 rounded font-medium">Oxford</span> during your summer trip to England 3 years ago. We haven’t heard from each other for a long time, right? Anyway, how are you? What have you been doing? <span className="underline decoration-indigo-400 font-medium font-semibold">You always wanted to be a teacher!</span>
                    {"\n\n"}
                    Here some of my news. I’m studying <span className="font-semibold text-slate-900">Laws at Oxford University</span>. I think I have changed a lot over the years. I don’t like thrillers any more. I prefer history books now. Do you remember <span className="bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-semibold text-xs inline-flex items-center">Pete, the tall thin guy with glasses</span>? He’s on the same course as me. We are best friends now!
                    {"\n\n"}
                    Well, I must finish now because I have an exam tomorrow. It would be really good if we could get together again.
                    {"\n\n"}
                    Write back soon and tell me all your news.
                    {"\n\n"}
                    <span className="font-semibold text-slate-900 block mt-2">Mary.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prompt Requirements & Mandates (Right Pane: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl flex-1 flex flex-col justify-between shadow-3xs">
              <div>
                <h3 className="font-bold text-blue-950 mb-3 uppercase text-xs tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-blue-600" />
                  Your Task:
                </h3>
                <p className="text-xs text-blue-900 mb-3 font-medium">Write a reply to Mary. In your email, you must:</p>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-800 font-medium pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">1</span>
                    <span>Tell her you still remember her and the time you visited her high school.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">2</span>
                    <span>Tell her all your news and what you have been doing (especially mentioning your teacher career or aspiration).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">3</span>
                    <span>Ask her to send your warm regards to Pete.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 border-t border-blue-100/80 pt-3.5 flex items-center justify-between">
                <span className="font-bold text-blue-800 italic text-xs sm:text-sm">You should write at least 120 words.</span>
                <span className="bg-blue-600 text-white uppercase font-bold text-[10px] px-2 py-0.5 rounded-xs">120+ Words Goal</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 shadow-3xs">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">VSTEP EXAM MANDATES</h4>
                  <p className="text-xs text-amber-900 leading-normal mt-1 leading-relaxed">
                    You must write at least <strong>120 words</strong>. Avoid copying whole clauses or sentences directly from Mary's email. Try to paraphrase to maximize your score.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* ===================== THE INTERACTIVE LEARNING & WRITING GRID ===================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ===================== LEFT SIDE: INTERACTIVE GUIDE (CEFR TABS) ===================== */}
          <div className="lg:col-span-12 xl:col-span-5 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden min-h-[500px]">
            
            {/* Guide tabs header */}
            <div className="bg-slate-50 border-b border-slate-200 px-5 pt-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3 font-display">
                <BookOpen className="w-4 h-4 text-blue-600" />
                VSTEP CEFR Phrase Bank & Guidelines
              </div>
              
              <div className="flex gap-1.5 pb-3">
                {Object.keys(CEFR_GUIDELINES).map((tab) => {
                  const active = activeGuideTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveGuideTab(tab)}
                      className={`flex-grow md:flex-initial text-center px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        active
                          ? "bg-blue-800 text-white shadow-xs"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {tab} Guidelines
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guide body content based on selected level */}
            {(() => {
              const guide: CEFRLevelGuide = CEFR_GUIDELINES[activeGuideTab];
              if (!guide) return null;
              return (
                <div className="p-5">
                  <div className={`bg-linear-to-r ${guide.color} text-white px-4 py-3 rounded-xl mb-4`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-mono font-semibold tracking-wider uppercase opacity-90">{guide.badge}</span>
                      <span className="bg-white/20 text-white rounded-full text-[10px] font-bold px-2 py-0.5">CEFR {activeGuideTab}</span>
                    </div>
                    <h3 className="text-lg font-bold">{guide.title}</h3>
                    <p className="text-xs leading-relaxed mt-1 text-slate-100 italic">
                      {guide.vietnameseSummary}
                    </p>
                  </div>

                  {/* Level Targets / Goals */}
                  <div className="mb-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">MỤC TIÊU CỦA TRÌNH ĐỘ</h4>
                    <ul className="space-y-1.5">
                      {guide.goals.map((g, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5 leading-normal">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Useful Vocabulary Table */}
                  <div className="mb-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex justify-between">
                      <span>TỪ VỰNG GỢI Ý (Useful Words)</span>
                      <span className="text-[10px] font-normal text-indigo-500 lowercase italic">Nhấp vào để chèn từ/cụm từ</span>
                    </h4>
                    <div className="border border-slate-100 rounded-lg overflow-hidden text-xs max-h-[220px] overflow-y-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-600 border-b border-slate-100 font-bold">
                            <th className="p-2 w-1/2">Phrase (English)</th>
                            <th className="p-2 w-1/2">Vietnamese Mean</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {guide.vocabulary.map((v, i) => (
                            <tr key={i} className="hover:bg-slate-50 transition-colors">
                              <td className="p-2 font-mono">
                                <button
                                  onClick={() => insertPhrase(v.phrase)}
                                  className="text-left font-semibold text-indigo-600 hover:underline hover:text-indigo-800"
                                  title="Chèn cụm từ này vào thư"
                                >
                                  {v.phrase}
                                </button>
                              </td>
                              <td className="p-2 text-slate-600">{v.vietnamese}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Useful Transitions Table */}
                  <div className="mb-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">LIÊN TỪ VÀ TỪ CHUYỂN TIẾP (Transitions)</h4>
                    <div className="border border-slate-100 rounded-lg overflow-hidden text-xs max-h-[160px] overflow-y-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-slate-600 border-b border-slate-100 font-bold">
                            <th className="p-2 w-1/2">Transition</th>
                            <th className="p-2 w-1/2">Vietnamese Mean</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {guide.transitions.map((t, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                              <td className="p-2 font-mono">
                                <button
                                  onClick={() => insertPhrase(t.phrase)}
                                  className="text-left font-semibold text-amber-600 hover:underline"
                                  title="Chèn liên từ vào bài"
                                >
                                  {t.phrase}
                                </button>
                              </td>
                              <td className="p-2 text-slate-500">{t.vietnamese}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Grammar Structures Showcase */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">CẤU TRÚC ĐẮT GIÁ THEO CẤP ĐỘ</h4>
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {guide.structures.map((s, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-200/50 rounded-lg p-2.5 text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-slate-800 font-mono">{s.pattern}</span>
                            <span className="text-[10px] text-indigo-500 italic font-semibold">{s.description}</span>
                          </div>
                          <p className="text-slate-600 font-serif italic mt-1">VD: &quot;{s.example}&quot;</p>
                          <div className="mt-2 text-right">
                            <button
                              onClick={() => insertPhrase(s.example)}
                              className="text-[10px] text-slate-500 hover:text-indigo-600 font-medium inline-flex items-center gap-0.5"
                            >
                              Chèn câu mẫu <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })()}

          </div>

          {/* ===================== RIGHT SIDE: WRITING LAB EDITOR ===================== */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* The Editor Card */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full animate-ping" />
                  <h3 className="text-base font-bold text-slate-900">
                    VSTEP Letter Playground & Editor
                  </h3>
                </div>
                
                {/* Template Preset Actions */}
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => loadTemplate('B1')}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded text-xs font-bold border border-slate-200"
                    title="Tải khung mở bài-thân-kết cơ bản trình độ B1"
                  >
                    Load B1 Helper
                  </button>
                  <button
                    onClick={() => loadTemplate('B2')}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded text-xs font-bold border border-slate-200"
                    title="Tải khung mở khóa tự nhiên nâng cao B2"
                  >
                    Load B2 Helper
                  </button>
                  <button
                    onClick={() => loadTemplate('clear')}
                    className="text-red-600 hover:bg-red-50 px-2.5 py-1 rounded text-xs font-bold"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Email Editor UI form */}
              <div className="p-5 flex flex-col gap-3 bg-[#fdfdfd]">
                
                {/* Subject mock field */}
                <div className="flex items-center border-b border-slate-100 pb-2 text-sm font-mono">
                  <span className="text-slate-400 font-semibold w-16">Subject:</span>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="bg-transparent border-none text-slate-800 focus:outline-hidden font-bold flex-grow text-sm"
                  />
                </div>

                {/* Main letter textarea body */}
                <div className="relative">
                  <textarea
                    value={draftText}
                    onChange={(e) => setDraftText(e.target.value)}
                    placeholder="Dear Mary,
Viết nội dung thư trả lời của bạn tại đây... Hãy nhập tối thiểu 120 từ. Để tối ưu thang điểm VSTEP, cấu trúc bức thư của bạn thành 3 phần:
1. Mở bài & Hỏi thăm + khẳng định vẫn nhớ chuyến đi Oxford.
2. Thân bài kể tin tức bản thân (đang phấn đấu làm/đã làm nghề dạy học).
3. Đề nghị gửi lời hỏi thăm Pete ấm áp."
                    className="w-full text-sm font-sans leading-relaxed text-slate-800 bg-transparent min-h-[380px] focus:outline-hidden resize-y placeholder-slate-400 p-1"
                    style={{ fontFeatureSettings: '"cv11" 1, "ss01" 1' }}
                  />
                  
                  {draftText === "" && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none text-slate-200/60 opacity-60 flex flex-col items-center">
                      <Mail className="w-16 h-16 stroke-1 mb-2" />
                      <span className="text-xs">Your draft will show here</span>
                    </div>
                  )}
                </div>

                {/* REAL-TIME METRICS FOOTER */}
                <div className="border-t border-slate-100 pt-3 flex flex-wrap items-center justify-between gap-4">
                  
                  {/* Dynamic word counter label badge */}
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                      wordCount >= 120 
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
                        : "bg-red-50 text-red-700 border border-red-100"
                    }`}>
                      {wordCount >= 120 ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{wordCount} words &middot; Đạt số từ đề bài yêu cầu</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                          <span>{wordCount} / 120 words &middot; Chưa đạt số từ</span>
                        </>
                      )}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">({charCount} ký tự)</span>
                  </div>


                </div>

              </div>
            </div>



            {/* ===================== COACH EVALUATION RESULTS REPORT PANEL ===================== */}
            {false && (
              <div 
                ref={feedbackRef}
                className="bg-white border-2 border-slate-900 rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
              >
                
                {/* Feedback Header with big badges */}
                <div className="bg-slate-900 text-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] tracking-wider text-emerald-400 font-mono font-bold uppercase">
                      <Award className="w-3.5 h-3.5" />
                      Official VSTEP Grading Report
                    </div>
                    <h3 className="text-lg font-bold mt-1 text-slate-50">Predicted Writing Grade</h3>
                  </div>
                  
                  {/* Big CEFR Score Badge */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Score Rating:</div>
                      <div className="text-sm font-semibold text-white">{feedback.overallScoreDescription}</div>
                    </div>
                    
                    <div className={`px-4 py-2 rounded-xl text-center shadow-inner flex flex-col justify-center min-w-[75px] ${
                      feedback.level === 'C1' 
                        ? "bg-emerald-600 text-white" 
                        : feedback.level === 'B2' 
                          ? "bg-amber-500 text-white" 
                          : feedback.level === 'B1' 
                            ? "bg-blue-600 text-white" 
                            : "bg-red-600 text-white"
                    }`}>
                      <span className="text-[10px] font-mono leading-none tracking-wide underline opacity-80 uppercase">Grade</span>
                      <span className="text-2xl font-black mt-0.5 leading-none">{feedback.level}</span>
                    </div>
                  </div>
                </div>

                {/* Score Report Checklist & Task Achievement Details */}
                <div className="p-6 divide-y divide-slate-100">
                  
                  {/* 1. Overall Critique */}
                  <div className="pb-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Overall Evaluation (Nhận xét tổng thảo)
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                      {feedback.overallFeedback}
                    </p>
                  </div>

                  {/* 2. Task Fulfillment (Đề bài đáp ứng) */}
                  <div className="py-5">
                    <h4 className="text-xs font-bold text-[#2c4a6e] uppercase tracking-wider mb-3">
                      Task Fulfillment Tracker (Ý đầy đủ theo đề bài)
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Point 1: Remember Mary Oxford visit */}
                      <div className={`border-l-4 p-3 rounded-r-lg text-xs flex flex-col justify-between h-full ${
                        feedback.taskAchievement.rememberedVisit 
                          ? "bg-emerald-50/55 border-emerald-500" 
                          : "bg-red-50/55 border-red-500"
                      }`}>
                        <div>
                          <div className="flex items-center justify-between gap-1 font-bold">
                            <span>1. Memorable Encounter</span>
                            {feedback.taskAchievement.rememberedVisit ? (
                              <CheckCircle className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                          <p className="text-slate-500 mt-1 leading-normal">
                            Xác nhận nhớ Mary và Oxford.
                          </p>
                        </div>
                        <span className={`text-[10px] font-bold mt-2 ${
                          feedback.taskAchievement.rememberedVisit ? "text-emerald-700" : "text-red-700"
                        }`}>
                          {feedback.taskAchievement.rememberedVisit ? "● Đạt yêu cầu" : "● Chưa nhắc"}
                        </span>
                      </div>

                      {/* Point 2: Teacher Career News */}
                      <div className={`border-l-4 p-3 rounded-r-lg text-xs flex flex-col justify-between h-full ${
                        feedback.taskAchievement.toldNews 
                          ? "bg-emerald-50/55 border-emerald-500" 
                          : "bg-red-50/55 border-red-500"
                      }`}>
                        <div>
                          <div className="flex items-center justify-between gap-1 font-bold">
                            <span>2. Telling Your News</span>
                            {feedback.taskAchievement.toldNews ? (
                              <CheckCircle className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                          <p className="text-slate-500 mt-1 leading-normal">
                            Báo tin học tập/sự nghiệp dạy học.
                          </p>
                        </div>
                        <span className={`text-[10px] font-bold mt-2 ${
                          feedback.taskAchievement.toldNews ? "text-emerald-700" : "text-red-700"
                        }`}>
                          {feedback.taskAchievement.toldNews ? "● Đạt yêu cầu" : "● Chưa nhắc"}
                        </span>
                      </div>

                      {/* Point 3: Regards to Pete */}
                      <div className={`border-l-4 p-3 rounded-r-lg text-xs flex flex-col justify-between h-full ${
                        feedback.taskAchievement.regardsToPete 
                          ? "bg-emerald-50/55 border-emerald-500" 
                          : "bg-red-50/55 border-red-500"
                      }`}>
                        <div>
                          <div className="flex items-center justify-between gap-1 font-bold">
                            <span>3. Greet Pete</span>
                            {feedback.taskAchievement.regardsToPete ? (
                              <CheckCircle className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                          <p className="text-slate-500 mt-1 leading-normal">
                            Gửi lời chúc hỏi thăm tới Pete.
                          </p>
                        </div>
                        <span className={`text-[10px] font-bold mt-2 ${
                          feedback.taskAchievement.regardsToPete ? "text-emerald-700" : "text-red-700"
                        }`}>
                          {feedback.taskAchievement.regardsToPete ? "● Đạt yêu cầu" : "● Chưa nhắc"}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs italic text-slate-500 mt-3 whitespace-pre-line bg-slate-50 p-2.5 rounded-lg">
                      {feedback.taskAchievement.comment}
                    </p>
                  </div>

                  {/* 3. Grammar & Spelling Corrections */}
                  <div className="py-5">
                    <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-3">
                      Sửa lỗi Ngữ pháp & Từ vựng (Grammar Corrections)
                    </h4>
                    {feedback.grammarCorrections.length === 0 ? (
                      <div className="bg-emerald-50 text-emerald-800 p-3 rounded-lg text-xs font-medium flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4" />
                        Bài viết của bạn đã rất chuẩn ngữ pháp! Không phát hiện lỗi nghiêm trọng nào.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {feedback.grammarCorrections.map((err, i) => (
                          <div key={i} className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                            <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-50 border-b border-slate-100">
                              <div className="p-2.5 bg-red-50 text-red-800 border-r border-slate-200">
                                <span className="font-bold text-[10px] uppercase block tracking-wider mb-0.5 opacity-75">Your Original</span>
                                <span className="font-mono">{err.original}</span>
                              </div>
                              <div className="p-2.5 bg-emerald-50 text-emerald-800">
                                <span className="font-bold text-[10px] uppercase block tracking-wider mb-0.5 opacity-75">Correction</span>
                                <span className="font-mono font-semibold">{err.corrected}</span>
                              </div>
                            </div>
                            <div className="p-2.5 text-slate-600 bg-white font-serif italic flex items-start gap-1.5">
                              <Info className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                              <span>{err.explanation}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 4. Sentence Level Upgrades */}
                  <div className="py-5">
                    <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-3 flex justify-between">
                      <span>Nâng cấp diễn đạt B2/C1 (Structure Upgrades)</span>
                      <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold">Recommended for VSTEP Level 4/5</span>
                    </h4>
                    {feedback.sentenceUpgrades.length === 0 ? (
                      <div className="text-slate-500 italic text-xs">Không có nâng cấp đặc biệt nào được đề xuất thêm.</div>
                    ) : (
                      <div className="space-y-3">
                        {feedback.sentenceUpgrades.map((upg, idx) => (
                          <div key={idx} className="bg-slate-50/50 border border-slate-100 rounded-xl p-3 text-xs">
                            <div className="flex justify-between items-center mb-1 bg-white p-1 rounded border border-slate-100">
                              <span className="text-slate-400">Plain level phrasing: <span className="font-mono text-slate-600 italic">"{upg.original}"</span></span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                upg.level === 'C1' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                Upgrade to {upg.level}
                              </span>
                            </div>
                            
                            <div className="mt-2 text-slate-800 font-bold flex items-center gap-1.5">
                              <TrendingUp className="w-4 h-4 text-indigo-600" />
                              <span className="font-mono text-sm">{upg.upgraded}</span>
                            </div>
                            
                            <p className="mt-1 text-slate-500 font-serif leading-relaxed italic pl-5">
                              {upg.reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Copy tools for improved letter */}
                  <div className="pt-4 flex items-center justify-between flex-wrap gap-3">
                    <div className="text-xs text-slate-500">
                      Tự tin bổ sung các góp ý và thực hành viết lại để đạt điểm lớn! 
                    </div>
                    <button
                      onClick={copyCorrectedLetter}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Tạo & Copy thư sửa lỗi tự động
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* DYNAMIC CHECKLIST FOR BEFORE SUBMITTING */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                <CheckSquare className="w-4.5 h-4.5 text-indigo-500" />
                VSTEP Writing Checklist & Self-Check (Tự kiểm soát bài)
              </h3>
              <p className="text-slate-500 text-xs mb-3">
                Hãy tích chọn các yếu tố bạn đã lồng ghép vào nội dung thư để theo dõi tiến trình bài làm:
              </p>
              
              <div className="space-y-2">
                {SELF_CHECK_ITEMS.map((item) => {
                  const checked = checkedItems[item.id] || false;
                  return (
                    <label 
                      key={item.id} 
                      onClick={() => toggleCheckItem(item.id)}
                      className={`flex items-start gap-3 p-2.5 rounded-lg text-xs cursor-pointer select-none transition-all border ${
                        checked 
                          ? "bg-emerald-50/55 border-emerald-100 text-slate-800 font-medium" 
                          : "bg-slate-50 hover:bg-slate-100 border-slate-200/50 text-slate-600"
                      }`}
                    >
                      <div className={`w-4.5 h-4.5 rounded flex items-center justify-center border mt-0.5 ${
                        checked ? 'bg-emerald-500 border-emerald-600 text-white' : 'bg-white border-slate-300'
                      }`}>
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <span>{item.text}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

        </section>

        {/* ===================== SECTION 3: VSTEP MODEL ANSWERS ===================== */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-12 mb-8">
          
          <div className="bg-blue-800 text-white px-6 py-5">
            <div className="text-xs text-blue-200 font-bold tracking-wider uppercase">STANDARD WRITING REFERENCE</div>
            <h2 className="text-xl font-bold mt-0.5">VSTEP Model Answers (Thư Mẫu Tham Khảo)</h2>
            <p className="text-xs text-blue-100 mt-1">
              Đọc và đối sánh để thấy sự khác biệt về vốn từ, cấu trúc nối và mức độ biểu cảm qua từng trình độ B1, B2 và C1 trong VSTEP.
            </p>
          </div>

          <div className="border-b border-slate-200 bg-slate-50 px-6 py-2 flex gap-2 overflow-x-auto">
            {MODEL_ESSAYS.map((essay) => {
              const active = activeModelTab === essay.level;
              return (
                <button
                  key={essay.level}
                  onClick={() => setActiveModelTab(essay.level)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                    active 
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs" 
                      : "bg-white text-slate-600 hover:bg-slate-100 border-slate-200"
                  }`}
                >
                  {essay.clout}
                </button>
              );
            })}
          </div>

          {(() => {
            const model: ModelAnswer | undefined = MODEL_ESSAYS.find(m => m.level === activeModelTab);
            if (!model) return null;
            return (
              <div className="p-6">
                
                {/* Big Model letter preview body */}
                <div className={`p-5 rounded-xl border font-mono text-sm whitespace-pre-line leading-relaxed mb-6 bg-slate-50/50 ${model.borderColor}`}>
                  <span className="font-sans font-bold text-xs uppercase text-slate-400 block tracking-widest mb-3 select-none">
                    MODEL EMAIL REPLY
                  </span>
                  {model.text}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs sm:text-sm">
                  
                  {/* Analysis English column */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-slate-600" />
                      Linguistic Analysis (English)
                    </h4>
                    <p className="text-xs text-slate-400 mb-3 block">Word count: <strong className="text-[#2c4a6e]">{model.wordCount} words</strong></p>
                    <ul className="space-y-2 text-slate-700">
                      {model.analysis_en.map((val, key) => (
                        <li key={key} className="flex items-start gap-1.5 leading-normal">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>{val}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Analysis Vietnamese column */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Info className="w-4 h-4 text-slate-600" />
                      Phân Tích Sắc Thái Học Thuật (Tiếng Việt)
                    </h4>
                    <p className="text-xs text-slate-400 mb-3 block">Ý nghĩa học thuật VSTEP</p>
                    <ul className="space-y-2 text-slate-700">
                      {model.analysis_vi.map((val, key) => (
                        <li key={key} className="flex items-start gap-1.5 leading-normal font-sans">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-1 flex-shrink-0" />
                          <span>{val}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>
            );
          })()}

        </section>

      </main>

    </div>
  );
}
