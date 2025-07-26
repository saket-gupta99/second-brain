export default function Design() {
  return (
    <div className="bg-dark-blue text-white px-6 py-12 lg:py-6">
        <span className="text-2xl font-semibold">Welcome</span>
        <div className="mt-20 flex flex-col items-center space-y-2">
            <h2 className="text-3xl font-bold lg:text-5xl">Unlock your Ideas.</h2>
            <h2 className="text-3xl font-bold lg:text-5xl">Organize your World.</h2>
            <h3 className="text-2xl mt-5 font-semibold">Your Personal Knowledge Hub</h3>
            <img src="./brain.jpg" alt="brain" className="h-64" />
        </div>
    </div>
  );
}
