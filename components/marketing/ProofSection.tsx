export function ProofSection() {
  return (
    <section className="w-full bg-white dark:bg-gray-950 py-20 px-4 md:py-32 md:px-6">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Kenapa percaya kami?
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-6">
          Kami tidak minta Anda percaya begitu saja.
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
          Semua sistem yang kami tawarkan sudah pernah kami bangun.
          Bukan konsep di atas kertas — Anda bisa lihat dan coba sendiri lewat demo langsung.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-bold text-black dark:text-white mb-2">Transparan</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Semua progress bisa Anda pantau lewat dashboard klien, real-time.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-black dark:text-white mb-2">Terdokumentasi</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Setiap project diserahkan dengan dokumentasi teknis yang lengkap.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-black dark:text-white mb-2">Bisa Dicoba</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Demo sistem tersedia sebelum Anda memutuskan apapun.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}