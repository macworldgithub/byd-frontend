'use client';

export default function BuildYourDreams() {
  return (
    <div className="bg-[#2a2a2f] rounded-2xl p-6 mx-4 mt-4 mb-4">
      <h1 className="text-white text-2xl font-bold mb-3">
        Build Your Dreams.
      </h1>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        An offline-first guided learning experience for every BYD model. Explore, configure, and continue on your phone with a single tap.
      </p>
      <button className="bg-[#3a3a3f] border border-gray-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-[#4a4a4f] transition-colors text-sm">
        Start Guide Tour
      </button>
    </div>
  );
}
