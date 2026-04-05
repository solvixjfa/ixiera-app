import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { ChatAssistant } from '@/components/marketing/ChatAssistant';
import { Newsletter } from '@/components/Newsletter';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      
      <main className="flex-1">{children}</main>
      
      {/* <-- TARUH NEWSLETTER TEPAT DI ATAS FOOTER --> */}
      <Newsletter />
      
      <Footer />
      <ChatAssistant />
    </>
  );
}