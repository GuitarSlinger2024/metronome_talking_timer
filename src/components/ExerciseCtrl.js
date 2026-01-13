import React, { useContext, useState } from 'react'
import { SettingsContext } from '../context/SettingsContext'
import Welcome from './Welcome'
import LessonInfo from './LessonInfo'
import Exercises from './Exercises'
import { useEffect } from 'react'

function ExerciseCtrl({ startLesson, pauseLesson, setStartLesson }) {
  const { section, part, lesson, metronomeSound, sounds, metronomeVolume, showPickDirections } =
    useContext(SettingsContext)

  const [lessonInfo, setLessonInfo] = useState(null)
  const [beatInterval, setBeatInterval] = useState(null)

  function getExerciseRecords() {
    let logData = localStorage.getItem('exerciseLogs') ? JSON.parse(localStorage.getItem('exerciseLogs')) : {}
    const key = `${section}-${part}-${lesson}`.replaceAll(' ', '')
    if (!logData[key]) logData[key] = []
    return logData[key]
  }

  function runMetronome(newSound) {
    const interval =
      section === 'Sweep Picking' &&
      (lesson === 'Changing Directions' || lesson === 'Building Speed')
        ? 750
        : 1500
    clearInterval(beatInterval)
    setBeatInterval(
      setInterval(() => {
        const sound = newSound.cloneNode()
        sound.volume = metronomeVolume / 100
        sound.play()
      }, interval)
    )
  }

  useEffect(() => {
    const newSound =
      sounds[
        metronomeSound.replace(' (default)', '').replace(' ', '_')
      ].cloneNode(true)
    newSound.volume = metronomeVolume / 100

    clearTimeout(beatInterval)
    setBeatInterval(null)
    if (startLesson) runMetronome(newSound)
  }, [startLesson, metronomeVolume, metronomeSound])

  return (
    <>
      {!section && <Welcome />}
      {section && !startLesson && (
        <LessonInfo
          section={section}
          part={part}
          lesson={lesson}
          lessonInfo={lessonInfo}
          setLessonInfo={setLessonInfo}
          bpm={(lesson === 'Changing Directions' || lesson === 'Building Speed') ? '80' : '40'}
          getExerciseRecords={getExerciseRecords}
        />
      )}
      {startLesson && (
        <Exercises
          pauseLesson={pauseLesson}
          lessonInfo={lessonInfo}
          startLesson={startLesson}
          setStartLesson={setStartLesson}
          metronomeVolume={metronomeVolume}
        />
      )}
    </>
  )
}

export default ExerciseCtrl
