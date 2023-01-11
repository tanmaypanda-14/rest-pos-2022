import React from 'react'
import DLayout from '../components/DLayout'
import { BarChart } from '../components/charts/BillBarChart'

function Stats() {
    return (
        <DLayout>
            <h3>Stats</h3>
            <div className='container'>
                <BarChart />
            </div>
        </DLayout>
    )
}

export default Stats