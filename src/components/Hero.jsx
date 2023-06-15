import { logo } from "../assets"

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="Sumz" className="w-28 object-contain"/>
        <button type="buttom" 
          onClick={() => window.open("https://github.com/AkamTemitope/aisummarizer")}
          className="black_btn ">GitHub
        </button>
      </nav>
      <h1 className="head_text">RapidSumm: An Open-Source Article Summarizer Powered by <br className="max-md:hidden"/>
        <span className="orange_gradient">OpenAI GPT</span>
      </h1>
      <h2 className="desc">
      With RapidSumm, you can effortlessly extract key insights from lengthy articles in just a matter of seconds. 
      Powered by OpenAI's state-of-the-art GPT technology, this open-source summarizer harnesses the prowess of natural language 
      processing to deliver concise and coherent summaries, enabling you to save valuable time without compromising on comprehension.
      </h2>
    </header>
  )
}

export default Hero