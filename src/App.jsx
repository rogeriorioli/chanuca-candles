import React from 'react';
import Hanukia from './components/Hanukia';

function App() {
  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center py-10 overflow-x-hidden relative"
      style={{
        backgroundImage: "url('/Gemini_Generated_Image_7t7rko7t7rko7t7r.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-slate-950/80 pointer-events-none z-0" />

      {/* Content wrapper to ensure z-index above overlay */}
      <div className="relative z-10 w-full flex flex-col items-center flex-grow">
        <Hanukia />
      </div>

      <footer className="relative z-10 mt-auto pt-10 text-slate-600 text-sm">
        <p class="flex gap-2 items-center"><svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.95337 3.74561H19.5128L18.1778 6.98061H3.15327L1.95337 3.74561Z" fill="#33DFC0" fill-opacity="0.84"></path><path d="M0.161219 2.29391C-0.368674 1.22225 0.472352 0 1.73974 0H19.597C20.8962 0 21.7358 1.27859 21.1435 2.35493C20.8463 2.89518 20.2491 3.23501 19.597 3.23501H1.73974C1.06133 3.23501 0.444914 2.86751 0.161219 2.29391Z" fill="#26A28B" fill-opacity="0.84"></path><path d="M3.59961 7.4917H17.8667L16.7818 11.0672H4.57452L3.59961 7.4917Z" fill="#26A28B" fill-opacity="0.84"></path><path d="M8.35522 15.4941H13.1109L11.383 18.8994H10.0249L8.35522 15.4941Z" fill="#26A28B" fill-opacity="0.84"></path><path d="M5.42871 11.5781H16.2205L15.3999 14.9834H6.16621L5.42871 11.5781Z" fill="#3CCFB5"></path></svg><a href="https://convertesites.com.br?utm_source=sidney" target="_blank" class="text-white/60 text-sm font-light hover:text-white transition-colors">convertesites.com.br</a></p>
      </footer>
    </div>
  );
}

export default App;
