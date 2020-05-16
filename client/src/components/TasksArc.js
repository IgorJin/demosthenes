import React from './node_modules/react';
import {XYPlot, ArcSeries, XAxis, YAxis} from './node_modules/react-vis/distdules/react-vis';
import TaskChangeIcon from './TaskChangeIcon'
const classNames = require('./node_modules/classnames');

const PI = Math.PI;

export default function TasksArc({ tasks }) {
      const myData = [
        {angle0: 0,          angle: 2* PI / 4,  radius: 3, radius0: 2.8, className :'diagramm__yellow'},
        {angle0: 2 * PI / 4, angle: 3 * PI / 4, radius: 3, radius0: 2.8, className :'diagramm__red'},
        {angle0: 3 * PI / 4, angle: 2 * PI,     radius: 3, radius0: 2.8, className :'diagramm__green'},
      ]
      const percentColor = classNames('diagramm__arc__percent' , 
        { });
    return (
      <div className='diagramm'>
        <XYPlot xDomain={[-5, 5]} yDomain={[-5, 5]} width={300} height={300} className='diagramm__arc'> 
          <ArcSeries
            animation
            radiusDomain={[0, 4]}
            data={myData}
            colorType={'category'}
          />
        <div className={percentColor}>60%</div>
        </XYPlot>

        <ul className='diagramm__list'>
          <li><TaskChangeIcon type='active'/><span>Active</span></li>
          <li><TaskChangeIcon type='completed'/><span>Completed</span> </li>
          <li><TaskChangeIcon type='ended'/><span>Ended</span> </li> 
        </ul>
      </div>
    );
  }