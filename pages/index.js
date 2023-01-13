import Head from 'next/head';
import Image from 'next/image';
import { useState} from 'react'

const Home = () => {
  const [userInput, setUserInput] = useState('')
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copy, setCopy] = useState('copy')

  
  const onUserChangedText = (event) => {
    console.log(event.target.value)
    setUserInput(event.target.value)
  }

  const callGenerateEndpoint = async() => {
    setIsGenerating(true)

    console.log('calling open ai')
    const response = await fetch('/api/generate', {
      method : 'POST',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    })

    const data = await response.json()
    const { output } = data;
    console.log('open ai replied', output.text)

    setApiOutput(`${output.text}`)
    setIsGenerating(false)
  }

    const handleCopyClick = async () => {
      try {
        await navigator.clipboard.writeText(apiOutput);
        setCopy('copied ✨')
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
      setTimeout(() => {
        setCopy('copy')
      }, 600);
    }

  return (
    <div className="root">
      <Head>
        <title>magic blogg </title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>magic blogg</h1>
          </div>
          <div className="header-subtitle">
            <h2>input the title of your blog and leave the rest to us</h2>
          </div>    
        </div>
        <div className='prompt-container'>

          <textarea 
            className='prompt-box' 
            placeholder='start typing your blog title here...'
            value={userInput}
            onChange={onUserChangedText}  
          />

          <div className='prompt-buttons'>
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
              <div className='generate' >
                {isGenerating ? <span className='loader'></span> : <p>Generate</p> }
              </div>
            </a>
          </div>

          {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>here is your awwwesome blog ✨</h3>
              </div>
            </div>
            <div className="output-content">
              <h4 className='copy' onClick={handleCopyClick}>{copy}</h4>
              <p className='output-text'>{apiOutput}</p>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
};

export default Home;
