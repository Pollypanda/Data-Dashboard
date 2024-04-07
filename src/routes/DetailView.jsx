// import React from 'react';
// import WeatherDetail from '../Components/WeatherDetail';

// const DetailView = () => {
//   return (
//     <div>
      
//       <WeatherDetail />
//     </div>
//   );
// };

// export default DetailView;


import React from 'react';
import { useParams } from 'react-router-dom';
import WeatherDetail from '../Components/WeatherDetail';

const DetailView = () => {
  const { date } = useParams();

  return (
    <div>
      <WeatherDetail date={date} />
    </div>
  );
};

export default DetailView;
