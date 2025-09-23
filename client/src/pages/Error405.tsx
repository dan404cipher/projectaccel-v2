import React from 'react';
import { Link } from 'react-router-dom';

// Image assets from Figma design
const imgVector = "http://localhost:3845/assets/758ad2f02a1f3d2f64ce7777da14460e76554177.svg";
const imgTablerArrowUp = "http://localhost:3845/assets/32a9fc7a82ffdb7dedc3b0381b2f73bfedddac86.svg";
const imgBackgroundSimple = "http://localhost:3845/assets/218e67a261a70cea6630d893a3633a6ae489c2d1.svg";
const imgPlanet3 = "http://localhost:3845/assets/650d940c90f2492646b9818e7597db4c5b0cbb5b.svg";
const imgVector1 = "http://localhost:3845/assets/a322a5fe8b9be17ca012e5d76db7a342dca080db.svg";
const imgGroup = "http://localhost:3845/assets/c6f0dc203748fb13b0be44e9c7239e93cad2ecbf.svg";
const imgGroup1 = "http://localhost:3845/assets/4e81d5bd0203921abfdfdd7be0f8f5ad34480dc4.svg";
const imgVector2 = "http://localhost:3845/assets/ab0910d3067490418e5c3b8381ffd1890cd9be60.svg";
const imgPlanet1 = "http://localhost:3845/assets/f6cba49d238cfe2ae65509961352a480be0a7dca.svg";
const imgPlanet = "http://localhost:3845/assets/0d58af4a1d0c138fef1a0aa72b51c3b29ade1f7f.svg";
const imgNumber2 = "http://localhost:3845/assets/49a13ebb542451cb3adf29c6a713c632ba4c7ad7.svg";

export default function Error405() {
  return (
    <div className="bg-white relative min-h-screen w-full overflow-hidden">
      {/* Background Vector */}
      <div className="absolute bottom-0 h-[1117px] left-1/2 translate-x-[-50%] w-[1728px]">
        <div className="absolute bottom-[-0.27%] left-[-0.17%] right-[-0.17%] top-[-0.27%]">
          <img alt="Background" className="block max-w-none size-full" src={imgVector} />
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="absolute bg-[#06263d] flex items-center justify-center left-1/2 px-[200px] py-4 rounded-lg top-[870.73px] translate-x-[-50%] w-[400px]">
        <Link to="/" className="flex items-center gap-4 text-white font-medium text-2xl hover:bg-[#0a3a5a] transition-colors duration-200 px-4 py-2 rounded">
          <div className="flex items-center justify-center">
            <div className="rotate-[270deg]">
              <div className="w-8 h-8">
                <img
                  alt="Arrow up"
                  className="block max-w-none size-full"
                  src={imgTablerArrowUp}
                />
              </div>
            </div>
          </div>
          <span className="font-medium text-2xl text-center">
            Back to Home
          </span>
        </Link>
      </div>

      {/* Main Content Container */}
      <div className="absolute bottom-[27.6%] top-[16.11%] left-1/2 translate-x-[-50%] w-full max-w-4xl">
        {/* Background Simple */}
        <div className="absolute bottom-[27.6%] left-[33.32%] right-[32.4%] top-[21.46%]">
          <img
            alt="Background simple"
            className="block max-w-none size-full"
            src={imgBackgroundSimple}
          />
        </div>

        {/* Planet 3 */}
        <div className="absolute bottom-[53.03%] left-[62.23%] right-[35.07%] top-[42.8%]">
          <img alt="Planet 3" className="block max-w-none size-full" src={imgPlanet3} />
        </div>

        {/* Planet 2 */}
        <div className="absolute bottom-[65.62%] left-[61.4%] right-[32.25%] top-[27.66%]">
          <div className="absolute bottom-[65.62%] left-[62.32%] right-[33.34%] top-[27.66%]">
            <img alt="Planet 2" className="block max-w-none size-full" src={imgVector1} />
          </div>
          <div className="absolute bottom-[65.62%] left-[62.32%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0.031px_0.004px] mask-size-[75.05px_75.045px] right-[33.34%] top-[27.66%]"
               style={{ maskImage: `url('${imgGroup}')` }}>
            <img alt="Planet 2 detail" className="block max-w-none size-full" src={imgGroup1} />
          </div>
          <div className="absolute bottom-[66.28%] left-[61.4%] right-[32.25%] top-[28.31%]">
            <img alt="Planet 2 outline" className="block max-w-none size-full" src={imgVector2} />
          </div>
        </div>

        {/* Planet 1 */}
        <div className="absolute bottom-[62.1%] left-[37.76%] right-[57.95%] top-[31.27%]">
          <img alt="Planet 1" className="block max-w-none size-full" src={imgPlanet1} />
        </div>

        {/* Main Planet */}
        <div className="absolute bottom-[35.22%] left-[39.73%] right-[39.73%] top-[33.01%]">
          <img alt="Main Planet" className="block max-w-none size-full" src={imgPlanet} />
        </div>

        {/* Number 2 decorations */}
        <div className="absolute bottom-[37.25%] left-[25.69%] right-[60.29%] top-[35.04%]">
          <img alt="Number 2" className="block max-w-none size-full" src={imgNumber2} />
        </div>
        <div className="absolute bottom-[37.25%] left-[60.3%] right-[25.68%] top-[35.04%]">
          <img alt="Number 2" className="block max-w-none size-full" src={imgNumber2} />
        </div>

        {/* Animated Character - Simplified for performance */}
        <div className="absolute bottom-[40.11%] left-[33.01%] right-[29.46%] top-[16.11%]">
          {/* Character body and details would go here - simplified for this implementation */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl animate-bounce">👨‍🚀</div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      <div className="absolute bottom-[30.26%] top-[65.53%] left-1/2 translate-x-[-50%] text-center">
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-normal text-[#666666] leading-tight">
          Oops! This page doesn't exist
        </h1>
      </div>

      {/* Additional Error Details */}
      <div className="absolute bottom-[20%] left-1/2 translate-x-[-50%] text-center space-y-4">
        <p className="text-xl lg:text-2xl text-[#666666]">
          Error 405 - Method Not Allowed
        </p>
        <p className="text-lg text-[#999999] max-w-md mx-auto">
          The request method is not supported for this resource. Please try a different approach.
        </p>
      </div>

      {/* Floating Elements Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#06263d] rounded-full animate-pulse opacity-20"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#06263d] rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-[#06263d] rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-[#06263d] rounded-full animate-pulse opacity-25"></div>
      </div>
    </div>
  );
} 