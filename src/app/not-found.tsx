import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
        <div className="text-8xl mb-6">😵</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          ページが見つかりません
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link 
          href="/"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          ホームに戻る 🏠
        </Link>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>デバッグ情報:</p>
          <p>Next.js App Router</p>
          <p>Vercel Deployment</p>
        </div>
      </div>
    </div>
  );
}