'use client';

import { Edit } from '@/app/globals.css';

export default function FilterControls() {
  return (
    <div className="fixed top-4 left-4 z-50 bg-black/70 backdrop-blur-sm text-white p-4 rounded-lg">
      <h3 className="font-semibold text-lg mb-3">CSS Filter Testing</h3>
      <div className="text-sm space-y-2">
        <p className="text-yellow-400">Edit globals.css to test filters:</p>
        <div className="font-mono text-xs space-y-1">
          <p>.grid-background &#123;</p>
          <p>&nbsp;&nbsp;filter: grayscale(70%) sepia(20%) opacity(60%);</p>
          <p>&#125;</p>
        </div>
        <div className="mt-3 space-y-1 text-xs">
          <p className="text-green-400">Spooky Combinations:</p>
          <p>• Haunted: grayscale(70%) sepia(20%) opacity(60%)</p>
          <p>• Nightmare: grayscale(90%) invert(15%) opacity(40%)</p>
          <p>• Shadow: grayscale(100%) opacity(30%)</p>
          <p>• Toxic: sepia(80%) invert(10%) saturate(200%)</p>
        </div>
      </div>
    </div>
  );
}