import React from 'react';

const Song = () => {
  return (
    <div>
      <h2>Bass</h2>
      <audio controls src="https://res.cloudinary.com/dtlnei8a0/video/upload/v1552923769/ga_p3_track1.m4a"
      type='audio'>
      </audio>
      <audio controls src="https://s3.amazonaws.com/beathostr/bucketFolder/1553029446997-lg.m4a" type='audio'>
      </audio>
    </div>
  )
}

export default Song;
