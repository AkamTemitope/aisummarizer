import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'


const Demo = () => {
  const [article, setArticle] = useState({
    url:"",
    summary:""
  })
  const [allArticles, setAllArticles] = useState([])
  const [copied, setCopied] = useState("")
  const [getSummary, { error, isFetching } ] = useLazyGetSummaryQuery()

  // Get articles from local storage
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({articleUrl: article.url})

    if (data?.summary) {
      const newArticle = {...article, summary: data.summary};
      const updateAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle)
      setAllArticles(updateAllArticles)
      localStorage.setItem('articles', JSON.stringify(updateAllArticles))
    }

  }

  const handleCopy = (copyData) => {
    setCopied(copyData)
    navigator.clipboard.writeText(copyData)
    setTimeout(() => setCopied(false), 3000)

  }
  
  return (
    <section className='mt-16 w-full max-w-xl'>
      { /* Search */ }
      <div className='flex flex-col w-full gap-2'>
        <form className='relative flex justify-center items-center'
          onSubmit={handleSubmit}>
          <img src={linkIcon} alt='link_icon' className='absolute left-0 my-2 ml-3 w-5'/>
          <input type='url' placeholder='Enter a url' 
            value={article.url}
            onChange={(e) => setArticle({...article, url: e.target.value})} 
            required 
            className='url_input peer'/>
          <button type='summit' className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>
            ↵
          </button>

        </form>
        {/* Browse URL History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((article, index) => (
            <div key={`link-${index}`}
              className='link_card'
              onClick={() => setArticle(article)}>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate '>{article.url}</p>
              <div className='copy_btn' onClick={() => handleCopy(article.url)}>
                <img src={copied === article.url ? tick : copy} alt='copy_icon' className='w-[40%] h-[40%] object-contain'/>
              </div>

            </div>
          ))}
        </div>
      </div>
      {/* Display Results */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (<img src={loader} alt='loader' className='w-20 h-20 object-contain' />):
        error? (<p 
                  className='font-inter font-bold text-black text-center'>
                  Oops, that wasn't supposed to happen...<br />
                  <span className='font-satoshi font-normal text-gray-700'>
                    {error?.data?.error}
                  </span>
            </p>):
        (article.summary && 
        <div className='flex flex-col gap-3 w-full'>
          <div className='flex'>
            <h2 className='flex-1 font-satoshi font-bold text-gray-600 text-xl'>Article  
              <span className='blue_gradient'> Summary</span>
            </h2>
            <div className='copy_btn' onClick={() => handleCopy(article.summary)}>
              <img src={copied === article.summary? tick : copy} alt='copy_icon' className='w-[80%] h-[80%] object-contain'/>
            </div>

          </div>
          <div className='summary_box'>
            <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
          </div>
        </div>)

        }

      </div>
    </section>
  )
}

export default Demo