"use client"

import React, { useEffect } from 'react'

function Error ({ error, reset }: { error: Error, reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <div>
      <h2>Registro não encontrado</h2>
      <p>ou não autorizado</p>
    </div>
  )
}

export default Error