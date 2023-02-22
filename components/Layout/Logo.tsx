import { Logo as LogoBase } from '@graphcommerce/next-ui'
import React = require('react')
import Image from './liquorcart.png'

export function Logo() {
  return (
    <LogoBase
      sx={{
        '& .GcLogo-logo': {
          width: 'auto',
          height: { xs: 'px', md: '50px' },
          paddingLeft: { xs: '10px', md: 0 },
          marginTop: { xs: 0, md: '-5px' },
          filter: (theme) => (theme.palette.mode === 'dark' ? 'invert(100%)' : 'invert(0%)'),
        },
      }}
      image={{ alt: 'Liquorcart logo', src: Image, unoptimized: true }}
    />
  )
}
