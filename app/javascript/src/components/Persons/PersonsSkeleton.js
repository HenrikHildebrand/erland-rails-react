import React from 'react'
import PersonSkeleton from './Person/PersonSkeleton'
import Aux from '../../hoc/Aux'
const i = [1, 2, 3]
const personsSkeleton = (props) => (
    <Aux>
        {i.map(j => (<PersonSkeleton key={j} />))}
    </Aux>
)

export default personsSkeleton;