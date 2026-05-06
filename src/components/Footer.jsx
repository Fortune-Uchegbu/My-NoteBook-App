import React from 'react'

export const Footer = () => {
  return (
    <footer className='col-span-1 lg:[grid-area:footer] px-default pt-1 text-center font-medium border-t border-border'>
        Copyright &copy; {new Date().getFullYear()} PandaCodes
    </footer>
  )
}