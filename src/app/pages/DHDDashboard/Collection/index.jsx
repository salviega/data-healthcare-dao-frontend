import './Collection.scss'
import React from 'react'
import { Plot } from './Plot'

export function Collection (props) {
  const { collection } = props
  const information = {
    bpm: collection.BPM,
    spo2: collection.SPO2,
    date: collection.DATE_C
  }
  return (
    <>
      <div className='collection-info'>
        <div className='collection-info-personal'>
          <p className='collection-info-personal__title'>My information</p>
          <p className='collection-info-personal__item'>
            <b>Wallet</b>: {collection.USER.WALLET}
          </p>
          <p className='collection-info-personal__item'>
            <b>Genere</b>: {collection.USER.GENERO}
          </p>
          <p className='collection-info-personal__item'>
            <b>Query ID</b> :{collection.USER.ID_QUERY}
          </p>
          <p className='collection-info-personal__item'>
            <b>Institute</b>: {collection.USER.INSTITUCION}
          </p>
          <p className='collection-info-personal__item'>
            Age: {collection.USER.MIN_EDAD} - {collection.USER.MAX_EDAD} years
          </p>
          <p className='collection-info-personal__item'>
            <b>Size cms</b>: {collection.USER.MIN_ESTATURA} -{' '}
            {collection.USER.MAX_ESTATURA}
          </p>
          <p className='collection-info-personal__item'>
            <b>Weight kgs</b>: {collection.USER.MIN_PESO} -{' '}
            {collection.USER.MAX_PESO}
          </p>
          <p className='collection-info-personal__item'>
            <b>Project</b>: {collection.USER.NOMBRE_PROYECTO}
          </p>
          <p className='collection-info-personal__item'>
            <b>Country</b>: {collection.USER.PAIS}
          </p>
          <p className='collection-info-personal__item'>
            <b>Deadline</b>: {collection.USER.TIME_STAMP}
          </p>
          {/* <button className='collection-info-personal__update'>
						UPDATE INFO
					</button> */}
        </div>
        <div className='collection-info-notification'>
          <p className='collection-info-notification__title'>Notifications</p>
        </div>
      </div>
      <div className='collection-data'>
        <div className='collection-data-owner'>
          <p className='collection-data-owner__title'>Your data</p>
          <div className='collection-data-owner-graphic'>
            <Plot information={information} />
          </div>
        </div>
      </div>
    </>
  )
}
