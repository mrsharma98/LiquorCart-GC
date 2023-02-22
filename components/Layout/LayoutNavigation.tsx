import header from '../../styles/header.module.css'
import { CartFab } from '@graphcommerce/magento-cart'
import { magentoMenuToNavigation } from '@graphcommerce/magento-category'
import { CustomerFab, CustomerMenuFabItem } from '@graphcommerce/magento-customer'
import { SearchLink } from '@graphcommerce/magento-search'
import { WishlistFab, WishlistMenuFabItem } from '@graphcommerce/magento-wishlist'
import {
  DesktopNavActions,
  DesktopNavBar,
  LayoutDefault,
  LayoutDefaultProps,
  iconCustomerService,
  iconHeart,
  NavigationFab,
  MenuFabSecondaryItem,
  PlaceholderFab,
  IconSvg,
  DesktopNavItem,
  DarkLightModeMenuSecondaryItem,
  iconChevronDown,
  NavigationProvider,
  NavigationOverlay,
  useNavigationSelection,
  useMemoDeep,
  iconSearch,
  iconShoppingBag,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Divider, Fab, Typography } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import { Footer } from './Footer'
import { LayoutQuery } from './Layout.gql'
import { Logo } from './Logo'
import Link from 'next/link'
import Image from 'next/image'
import { CustomLayout } from './CustomLayout'

export type LayoutNavigationProps = LayoutQuery &
  Omit<LayoutDefaultProps, 'footer' | 'header' | 'cartFab' | 'menuFab'>

export function LayoutNavigation(props: LayoutNavigationProps) {
  const { footer, menu, children, ...uiProps } = props

  const selection = useNavigationSelection()
  const router = useRouter()
  
  const styles ={
    
    display: router.pathname ==='/' ? 'block' : 'none'
  }

  return (
    <>
      <NavigationProvider
        selection={selection}
        items={useMemoDeep(
          () => [
            <SearchLink
              href='/search'
              sx={(theme) => ({
                width: `calc(100% - ${theme.spacing(4)})`,
                m: 2,
                mb: theme.spacings.xs,
              })}
              aria-label={i18n._(/* i18n */ 'Search...')}
            >
              <Trans id='Search...' />
            </SearchLink>,
            { id: 'home', name: <Trans id='Home' />, href: '/' },
            {
              id: 'manual-item-one',
              href: `/${menu?.items?.[0]?.children?.[0]?.url_path}`,
              name: menu?.items?.[0]?.children?.[0]?.name ?? '',
            },
            {
              id: 'manual-item-two',
              href: `/${menu?.items?.[0]?.children?.[1]?.url_path}`,
              name: menu?.items?.[0]?.children?.[1]?.name ?? '',
            },
            ...magentoMenuToNavigation(menu, true),
            { id: 'blog', name: 'Blog', href: '/blog' },
            <Divider sx={(theme) => ({ my: theme.spacings.xs })} />,
            <CustomerMenuFabItem key='account' guestHref='/account/signin' authHref='/account'>
              <Trans id='Account' />
            </CustomerMenuFabItem>,
            <MenuFabSecondaryItem
              key='service'
              icon={<IconSvg src={iconCustomerService} size='medium' />}
              href='/service'
            >
              <Trans id='Customer Service' />
            </MenuFabSecondaryItem>,
            <WishlistMenuFabItem key='wishlist' icon={<IconSvg src={iconHeart} size='medium' />}>
              <Trans id='Wishlist' />
            </WishlistMenuFabItem>,
            <DarkLightModeMenuSecondaryItem key='darkmode' />,
          ],
          [menu],
        )}
      >
        <NavigationOverlay
          stretchColumns={false}
          variantSm='left'
          sizeSm='full'
          justifySm='start'
          itemWidthSm='70vw'
          variantMd='left'
          sizeMd='full'
          justifyMd='start'
          itemWidthMd='230px'
          mouseEvent='hover'
          itemPadding='md'
        />
      </NavigationProvider>
    
      <div  className={header.error}>
        <div className={header.logo}>
          <Logo/>
        </div>

        <div className={header.nav}>
            <ul className={header.list}>
                
                
                <li>
                    <WishlistFab icon={<IconSvg src={iconHeart} size='large' />} />
                </li>
                <li>
                    <CustomerFab guestHref='/account/signin' authHref='/account' />
                </li>
               <li>
                   <Link href='/cart'>
                     <IconSvg src={iconShoppingBag} size='large' sx={{color:'black' ,marginTop:'15px'}}/>
                   </Link>
                </li>
            </ul>
        </div>
      {/* //these are the product categoris */}
          <div className={header.category}>
              <DesktopNavBar>
                      {menu?.items?.[0]?.children?.slice(0, 2).map((item) => (
                        <DesktopNavItem key={item?.uid} href={`/${item?.url_path}`}>
                          {item?.name}
                        </DesktopNavItem>
                      ))}

                      <DesktopNavItem onClick={() => selection.set([menu?.items?.[0]?.uid || ''])}>
                        {menu?.items?.[0]?.name}
                        <IconSvg src={iconChevronDown} />
                      </DesktopNavItem>
                      
              </DesktopNavBar>
              <div className={header.search_bar}>
                    {!router.pathname.startsWith('/search') && (
                      <SearchLink href='/search' />
                    )}
              </div>
              <div className={header.lady_image} style={styles}>
                <Image src={'/images/lady.jpg'} width={1500} height={800}/>
              </div>
            
              <CustomLayout
                {...uiProps}
                noSticky={router.asPath.split('?')[0] === '/'}
              >
              {children}
              </CustomLayout>
             
          </div>
      </div>

    </>
  )
}
