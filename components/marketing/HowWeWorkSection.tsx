export function HowWeWorkSection() {
  const steps = [
    {
      number: '01',
      title: 'Konsultasi',
      desc: 'Kami mulai dengan memahami bisnis Anda — bukan langsung jualan solusi yang belum tentu Anda butuhkan.',
    },
    {
      number: '02',
      title: 'Proposal & Scope',
      desc: 'Anda mendapat proposal jelas: apa yang dikerjakan, berapa lama, dan berapa biayanya.',
    },
    {
      number: '03',
      title: 'Build & Deliver',
      desc: 'Kami kerjakan dengan standar teknis tinggi. Anda bisa pantau progress kapan saja lewat dashboard klien.',
    },
    {
      number: '04',
      title: 'Handover & Support',
      desc: 'Project selesai bukan berarti kami pergi. Dokumentasi lengkap, pelatihan, dan support lanjutan tersedia.',
    },
  ];

  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 py-20 px-4 md:py-32 md:px-6">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 text-center">
          Cara kami bekerja
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white text-center mb-12">
          Transparan dari awal sampai selesai.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4">
              <span className="text-3xl font-bold text-gray-300 dark:text-gray-700">{step.number}</span>
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}