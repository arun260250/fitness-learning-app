import React, { useMemo, useState } from "react";

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl shadow-lg p-5 bg-white ${className}`}>{children}</div>
);
const Button = ({ children, onClick, className = "", type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-3 rounded-2xl shadow hover:shadow-md active:scale-[0.99] transition w-full text-center ${className}`}
  >
    {children}
  </button>
);
const Chip = ({ children }) => (
  <span className="inline-block rounded-full px-3 py-1 text-sm bg-gray-100">{children}</span>
);

export default function FitnessLearningApp() {
  const [studentName, setStudentName] = useState("");
  const [page, setPage] = useState("start");
  const [stack, setStack] = useState([]);

  function go(next) { setStack((s) => [...s, page]); setPage(next); }
  function back() { setStack((s) => { const last = s[s.length - 1]; if (!last) return s; setPage(last); return s.slice(0, -1); }); }
  function home() { setPage("home"); setStack([]); }

  return (
    <div className="container">
      <Header onBack={page !== "start" ? back : null} onHome={page !== "start" ? home : null} />

      {page === "start" && (
        <StartScreen studentName={studentName} setStudentName={setStudentName} onStart={() => go("home")} />
      )}
      {page === "home" && <Home go={go} />}
      {page === "info" && <InfoPage />}
      {page === "pretest" && <QuizPage key="pre" title="ทดสอบก่อนเรียน" onDone={() => go("clips")} />}
      {page === "posttest" && <QuizPage key="post" title="ทดสอบหลังเรียน" onDone={() => go("summary")} />}
      {page === "clips" && <ClipsPage openClip={() => go("clip-detail")} />}
      {page === "clip-detail" && <ClipDetailPage onNext={() => go("tips")} />}
      {page === "tips" && <TipsPage onNext={() => go("posttest")} />}
      {page === "survey" && <SurveyPage studentName={studentName} />}
      {page === "summary" && <SummaryPage go={go} />}

      <FooterNav showBack={page !== "start"} onBack={back} onHome={page !== "start" ? home : null} />
    </div>
  );
}

const Header = ({ onBack, onHome }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="w-12">
      {onBack ? (<button onClick={onBack} className="text-xl">← ย้อนกลับ</button>) : (<span />)}
    </div>
    <h1 className="text-2xl font-bold">เว็บเรียนรู้ออกกำลังกาย</h1>
    <div className="w-12 text-right">{onHome && (<button onClick={onHome} className="text-xl">🏠</button>)}</div>
  </div>
);

const FooterNav = ({ showBack, onBack, onHome }) => (
  <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
    <div>{showBack && <button onClick={onBack}>← ย้อนกลับ</button>}</div>
    <div>{onHome && <button onClick={onHome}>กลับหน้าแรก</button>}</div>
  </div>
);

function StartScreen({ studentName, setStudentName, onStart }) {
  return (
    <Card className="bg-white/90">
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-extrabold">ชื่อโครงงาน: กล้ามเนื้อแข็งแรง</div>
          <div className="mt-2 text-gray-600">ทำโดย ล่าคนนอนน้อย แต่ก็เยอะนะ</div>
        </div>
        <div className="grid gap-2">
          <label className="text-sm text-gray-600">กรอกชื่อผู้เรียน</label>
          <input
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="เช่น คนสวย ใจดี"
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>
        <Button onClick={onStart} className="bg-indigo-600 text-white font-semibold">START</Button>
      </div>
    </Card>
  );
}

function Home({ go }) {
  const menus = [
    { key: "pretest", label: "ทดสอบก่อนเรียน" },
    { key: "info", label: "ข้อมูลให้ความรู้" },
    { key: "clips", label: "คลิปตัวอย่างท่าออกกำลัง" },
    { key: "survey", label: "ประเมินความพึงพอใจ" },
  ];
  return (
    <div className="space-y-4">
      {menus.map((m) => (
        <Button key={m.key} onClick={() => go(m.key)} className="bg-white">{m.label}</Button>
      ))}
      <div className="text-right text-gray-500">→ ไปต่อ</div>
    </div>
  );
}

function InfoPage() {
  const sections = [
    { title: "สาเหตุที่ทำให้เกิดปัญหา", body: "เช่น นั่งนาน ขาดการยืดเหยียด พักผ่อนไม่พอ ภาวะเครียด โภชนาการไม่เหมาะสม และเทคนิคการยกของที่ผิดวิธี" },
    { title: "ผลกระทบ", body: "เจ็บเมื่อย ประสิทธิภาพการเรียน/ทำงานลดลง เสี่ยงบาดเจ็บเรื้อรัง ภาพลักษณ์และความมั่นใจลดลง" },
    { title: "อัตราการเกิด", body: "วัยเรียน–วัยทำงานจำนวนมากมีอาการปวดคอ บ่า หลัง จากพฤติกรรมนั่งจอเป็นเวลานาน" },
    { title: "ควรดูแลตัวเองอย่างไร", body: "หลัก 3 ข้อ: (1) ยืดเหยียดทุก 45–60 นาที (2) ฝึกแกนกลาง/สะบัก/หลังล่าง สัปดาห์ละ 3 วัน (3) นอนและโภชนาการให้พอ" },
  ];
  return (
    <div className="space-y-4">
      {sections.map((s) => (
        <Card key={s.title}>
          <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
          <p className="text-gray-700">{s.body}</p>
        </Card>
      ))}
    </div>
  );
}

function QuizPage({ title, onDone }) {
  const QUESTIONS = useMemo(() => [
    { q: "นั่งทำงาน/เรียนเกินกี่นาทีควรลุกยืดเหยียด?", choices: ["120 นาที", "45–60 นาที", "15 นาที"], a: 1 },
    { q: "ท่า Plank ช่วยเสริมกล้ามเนื้อกลุ่มใดเป็นหลัก?", choices: ["ต้นขา", "แกนกลางลำตัว", "ปลายแขน"], a: 1 },
    { q: "ระหว่างออกกำลัง ควรหายใจแบบไหน?", choices: ["กลั้นหายใจ", "หายใจสม่ำเสมอ", "หายใจเฉพาะตอนยกขึ้น"], a: 1 },
    { q: "ถ้ามีสิว/ผดบนหน้าอกขณะออกกำลัง ควรทำอย่างไร?", choices: ["ใส่เสื้อระบายอากาศ อาบน้ำทันที", "ไม่ต้องสนใจ", "ทายาหนา ๆ ก่อนออกกำลัง"], a: 0 },
    { q: "การวอร์มอัพควรใช้เวลาประมาณ…", choices: ["1 นาที", "5–10 นาที", "30 นาที"], a: 1 },
    { q: "โปรตีนที่แนะนำต่อมื้อสำหรับผู้ฝึกทั่วไป", choices: ["2–5 กรัม", "20–30 กรัม", "100 กรัม"], a: 1 },
    { q: "หากปวดแหลมคมระหว่างฝึกควร…", choices: ["ฝืนต่อ", "หยุดและประเมินท่า/พัก", "กินน้ำหวาน"], a: 1 },
    { q: "การนอนที่ดีต่อการฟื้นตัวควรอย่างน้อย", choices: ["4 ชม.", "6 ชม.", "7–9 ชม."], a: 2 },
  ], []);

  const [ans, setAns] = useState(Array(QUESTIONS.length).fill(null));
  const [done, setDone] = useState(false);
  const correct = ans.filter((v, i) => v === QUESTIONS[i].a).length;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {QUESTIONS.map((item, idx) => (
        <Card key={idx}>
          <p className="font-medium mb-3">{idx + 1}. {item.q}</p>
          <div className="grid gap-2">
            {item.choices.map((c, ci) => (
              <label key={ci} className="flex items-center gap-3">
                <input
                  type="radio"
                  name={`q${idx}`}
                  checked={ans[idx] === ci}
                  onChange={() => setAns((a) => a.map((v, i) => (i === idx ? ci : v)))}
                />
                <span>{c}</span>
              </label>
            ))}
          </div>
        </Card>
      ))}
      {!done ? (
        <Button onClick={() => setDone(true)} className="bg-indigo-600 text-white font-semibold">ตรวจคำตอบ</Button>
      ) : (
        <Card className="text-center">
          <div className="text-2xl font-bold">คะแนน {correct} / {QUESTIONS.length}</div>
          <p className="text-gray-600 mt-2">{correct >= QUESTIONS.length * 0.7 ? "เยี่ยมมาก!" : "ทบทวนเนื้อหาและลองใหม่ได้"}</p>
          <div className="mt-4 grid gap-3">
            <Button onClick={onDone} className="bg-emerald-600 text-white">ไปต่อ →</Button>
            <Button onClick={() => { setAns(Array(QUESTIONS.length).fill(null)); setDone(false); }} className="bg-white">ทำแบบทดสอบใหม่</Button>
          </div>
        </Card>
      )}
    </div>
  );
}

function ClipsPage({ openClip }) {
  const items = new Array(6).fill(0).map((_, i) => ({ title: `คลิปท่าที่ ${i + 1}`, desc: i % 2 === 0 ? "ยืดเหยียดคอ บ่า สะบัก" : "เสริมกำลังแกนกลาง/หลังล่าง" }));
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">แนะนำคลิปออกกำลังกาย</h2>
      <div className="grid gap-4" style={{gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))"}}>
        {items.map((it, idx) => (
          <Card key={idx}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">{it.title}</div>
                <div className="text-gray-600 text-sm">{it.desc}</div>
                <div className="mt-2" style={{display:'flex', gap:'.5rem', flexWrap:'wrap'}}>
                  <Chip>BEGINNER</Chip>
                  <Chip>3–5 นาที</Chip>
                </div>
              </div>
              <Button onClick={openClip} className="bg-indigo-600 text-white w-auto">ดูรายละเอียด</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ClipDetailPage({ onNext }) {
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="font-semibold text-lg mb-2">คลิป: ท่าออกกำลังกายแกนกลาง</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li><b>ควรทำกี่ครั้ง:</b> 2–3 เซต เซตละ 8–12 ครั้ง หรือค้างท่าละ 20–40 วินาที</li>
          <li><b>ควรระวังอะไร:</b> หลังแอ่น/งอมากเกินไป กลั้นหายใจ ไหล่ยกตึง</li>
          <li><b>ช่องทาง:</b> วิดีโอตัวอย่าง (สมมติ) — ใส่ลิงก์ YouTube ได้ในงานจริง</li>
        </ul>
      </Card>
      <Button onClick={onNext} className="bg-emerald-600 text-white font-semibold">สรุปคลิปที่ผ่านมา →</Button>
    </div>
  );
}

function TipsPage({ onNext }) {
  const tips = ["ควรทานอาหารดี", "กินโปรตีน", "ออกกำลังสม่ำเสมอ", "ดื่มน้ำและนอนให้พอ"];
  return (
    <Card>
      <h3 className="font-semibold text-lg mb-3">ข้อแนะนำ</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        {tips.map((t) => (<li key={t}>{t}</li>))}
      </ul>
      <div className="mt-4">
        <Button onClick={onNext} className="bg-indigo-600 text-white">ไปทำแบบทดสอบหลังเรียน →</Button>
      </div>
    </Card>
  );
}

function SurveyPage({ studentName }) {
  const [rate, setRate] = useState(0);
  const [fb, setFb] = useState("");
  const hearts = [1,2,3,4,5];
  return (
    <Card>
      <h3 className="font-semibold text-lg mb-3">แบบประเมินความพึงพอใจ</h3>
      <div className="mb-4">สวัสดี{studentName ? ` ${studentName}` : " ผู้เรียน"} โปรดให้คะแนนความพึงพอใจ</div>
      <div className="flex gap-2 text-3xl">
        {hearts.map((h) => (
          <button key={h} onClick={() => setRate(h)} aria-label={`ให้ ${h} คะแนน`}>
            <span style={{opacity: h <= rate ? 1 : .3}}>❤️</span>
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-2">
        <label className="text-sm text-gray-600">ข้อเสนอแนะเพิ่มเติม</label>
        <textarea value={fb} onChange={(e) => setFb(e.target.value)} rows={4} className="w-full rounded-xl border px-4 py-3" placeholder="เขียนความเห็นของคุณที่นี่" />
      </div>
      <div className="mt-4 grid gap-3" style={{gridTemplateColumns:'repeat(auto-fit, minmax(180px,1fr))'}}>
        <Button onClick={() => alert("บันทึกแบบประเมินแล้ว ขอบคุณครับ/ค่ะ") } className="bg-emerald-600 text-white">ส่งแบบประเมิน</Button>
        <Button onClick={() => window.print()} className="bg-white">พิมพ์/บันทึกเป็น PDF</Button>
      </div>
    </Card>
  );
}

function SummaryPage({ go }) {
  return (
    <Card>
      <h3 className="font-semibold text-lg mb-2">สรุปเนื้อหาสำคัญ</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>รู้จักสาเหตุและผลกระทบของการขาดการเคลื่อนไหว</li>
        <li>ฝึกท่าแกนกลาง ยืดเหยียด และวอร์มอัพอย่างถูกวิธี</li>
        <li>โภชนาการ การนอน และการพัก สำคัญต่อการฟื้นตัว</li>
      </ul>
      <div className="mt-4 grid gap-3" style={{gridTemplateColumns:'repeat(auto-fit, minmax(180px,1fr))'}}>
        <Button onClick={() => go("survey")} className="bg-indigo-600 text-white">ทำแบบประเมินความพึงพอใจ</Button>
        <Button onClick={() => go("home")} className="bg-white">กลับหน้าแรก</Button>
      </div>
    </Card>
  );
}
