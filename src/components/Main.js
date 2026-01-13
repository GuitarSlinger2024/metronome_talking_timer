import '../App.css'
import { useEffect, useState } from 'react'

//  Components
import Header from '../components/Header'
import LessonCtrls from '../components/LessonCtrls'
import AudioCtrls from '../components/AudioCtrls'
// import Welcome from '../components/Welcome'
import ExerciseCtrl from '../components/ExerciseCtrl'

//  Images & data
import mode_btn from '../_img/mode_btn.png'

function Main() {
  const [mode, setMode] = useState('')
  const [ready, setReady] = useState(false)
  const [startLesson, setStartLesson] = useState(false)
  const [pauseLesson, setPauseLesson] = useState(false)

  useEffect(() => {
    const savedMode = localStorage.getItem('pickHandMode')
    setMode(savedMode || 'light')
  }, [])

  useEffect(() => {
    if (mode) localStorage.setItem('pickHandMode', mode)
  }, [mode])

  return (
    <>
      <div className={`App ${mode}`}>
        <img
          src={mode_btn}
          alt="light/dark mode"
          id="lightModeBtn"
          onClick={() => {
            setMode(mode === 'light' ? 'dark' : 'light')
          }}
        />
        <Header />
        <div id="controls">
          <LessonCtrls
            setReady={setReady}
            startLesson={startLesson}
          />
          <AudioCtrls
            mode={mode}
            ready={ready}
            startLesson={startLesson}
            setStartLesson={setStartLesson}
            pauseLesson={pauseLesson}
            setPauseLesson={setPauseLesson}
          />
        </div>

        <ExerciseCtrl
          startLesson={startLesson}
          pauseLesson={pauseLesson}
          setStartLesson={setStartLesson}
        />
      </div>
    </>
  )
}

export default Main
