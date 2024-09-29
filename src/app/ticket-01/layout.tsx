'use client';
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Badge, Collapse, InputBase, Menu, MenuItem, Paper } from '@mui/material';
import { ExpandLess, ExpandMore, ConfirmationNumber, PanTool, Widgets, EditNote, Camera, Leaderboard, AccountCircle, Search, Notifications, Airplay } from '@mui/icons-material';
import Link from 'next/link';
import '@/styles/css/global.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const theme = useTheme();
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);

    };

    const handleDrawerClose = () => {
        setOpen(false);
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);
        setOpen5(false);
        setOpen6(false);
        setOpen7(false);
        setOpen8(false);
    };

    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);
    const [open6, setOpen6] = React.useState(false);
    const [open7, setOpen7] = React.useState(false);
    const [open8, setOpen8] = React.useState(false);

    const handleClick2 = () => {
        setOpen2(!open2);
        setOpen(true);
        setOpen3(false);
        setOpen4(false);
        setOpen5(false);
        setOpen6(false);
        setOpen7(false);
        setOpen8(false);
    };

    const handleClick3 = () => {
        setOpen3(!open3);
        setOpen(true);
        setOpen2(false);
        setOpen4(false);
        setOpen5(false);
        setOpen6(false);
        setOpen7(false);
        setOpen8(false);
    };

    const handleClick4 = () => {
        setOpen4(!open4);
        setOpen(true);
        setOpen2(false);
        setOpen3(false);
        setOpen5(false);
        setOpen6(false);
        setOpen7(false);
        setOpen8(false);
    };

    const handleClick5 = () => {
        setOpen5(!open5);
        setOpen(true);
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);
        setOpen6(false);
        setOpen7(false);
        setOpen8(false);
    };

    const handleClick6 = () => {
        setOpen6(!open6);
        setOpen(true);
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);
        setOpen5(false);
        setOpen7(false);
        setOpen8(false);
    };

    const handleClick7 = () => {
        setOpen7(!open7);
        setOpen(true);
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);
        setOpen5(false);
        setOpen6(false);
        setOpen8(false);
    };

    const handleClick8 = () => {
        setOpen8(!open8);
        setOpen(true);
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);
        setOpen5(false);
        setOpen6(false);
        setOpen7(false);
    };

    // AccountCircle
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        sessionStorage.clear();
        router.push('/login');
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 350, borderRadius: 20, height: 40, backgroundColor: '#f1f1f1', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.23)' }}
                    >
                        <IconButton sx={{ p: '10px' }} aria-label="menu">
                            <Search />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Tìm kiếm theo SĐT"
                        />
                    </Paper>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <div style={{ paddingRight: 10 }}>
                            <span>{sessionStorage.getItem('name_user')}</span>
                        </div>
                        <div style={{ marginLeft: 10, backgroundColor: '#339900', borderRadius: 5, padding: 5 }}>
                            <span>TK: 5.000.000 đ</span>
                        </div>
                        <Badge badgeContent={4} color="secondary" style={{ marginRight: 10, marginLeft: 20 }}>
                            <Notifications />
                        </Badge>
                        <IconButton color="inherit" aria-label="account">
                            <Airplay />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label="system"
                            onClick={handleClick}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Đổi mật khẩu</MenuItem>
                            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItemButton onClick={handleClick2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ListItemIcon>
                                <ConfirmationNumber />
                            </ListItemIcon>
                            <span>Hành khách</span>
                        </div>
                        {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link href="/ticket-01/ticket-sales" passHref className='itemMenu'>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <span>1.1 Vé hành khách</span>
                                </ListItemButton>
                            </Link>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>1.2 Tra cứu thông tin vé</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>1.3 Báo cáo công nợ đại lý</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>1.4 Thống kê chuyến theo tài xế</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>1.5 Báo cáo theo nhân viên</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>1.6 Báo cáo theo tài xế</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>1.7 Yêu cầu xuất vé điện tử</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>1.8 Báo cáo</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>1.9 Lệnh vận chuyển điện tử</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>1.10 Xuất hóa đơn điện tử</span>
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
                <List>
                    <ListItemButton onClick={handleClick3} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ListItemIcon>
                                <Widgets />
                            </ListItemIcon>
                            <span>Hàng hóa</span>
                        </div>
                        {open3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>2.1 Tra cứu hàng hóa</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>2.2 Báo cáo hàng hóa</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>2.3 Hàng hóa theo nhân viên</span>
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>

                <List>
                    <ListItemButton onClick={handleClick4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ListItemIcon>
                                <Leaderboard />
                            </ListItemIcon>
                            <span>Điều hành</span>
                        </div>
                        {open4 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open4} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>3.1 Phân tài trung chuyển khách</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>3.2 Sắp xếp tuyến</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>3.3 Báo cáo theo tài xế</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>3.4 Báo cáo trung chuyển</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>3.5 Thu chi chuyến</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>3.6 Báo cáo sổ quỹ tiền mặt</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>3.7 Danh sách chuyến</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>3.8 Quản lý chuyến</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>3.9 Nhiên liệu</span>
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>

                <List>
                    <ListItemButton onClick={handleClick5} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <span>Quản lý</span>
                        </div>
                        {open5 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open5} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>4.1 Mã khuyến mãi</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>4.2 Chính sách hủy vé</span>
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>

                <List>
                    <ListItemButton onClick={handleClick6} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ListItemIcon>
                                <EditNote />
                            </ListItemIcon>
                            <span>Khai báo</span>
                        </div>
                        {open6 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open6} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link href="/ticket-01/user" passHref className='itemMenu'>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <span>5.1 Nhân viên</span>
                                </ListItemButton>
                            </Link>
                            <Link href="/ticket-01/point" passHref className='itemMenu'>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <span>5.2 Điểm dừng</span>
                                </ListItemButton>
                            </Link>
                            <Link href="/ticket-01/route" passHref className='itemMenu'>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <span>5.3 Tuyến</span>
                                </ListItemButton>
                            </Link>
                            <Link href="/ticket-01/seat-map" passHref className='itemMenu'>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <span>5.4 Sơ đồ ghế</span>
                                </ListItemButton>
                            </Link>
                            <Link href="/ticket-01/vehicle" passHref className='itemMenu'>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <span>5.5 Phương tiện</span>
                                </ListItemButton>
                            </Link>
                            <Link href="/ticket-01/plan-for-trip" passHref className='itemMenu'>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <span>5.6 Lịch chạy</span>
                                </ListItemButton>
                            </Link>
                            <Link href="/ticket-01/level-agency" passHref className='itemMenu'>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <span>5.7 Cấp đại lý</span>
                                </ListItemButton>
                            </Link>
                            <Link href="/ticket-01/agency" passHref className='itemMenu'>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <span>5.8 Đại lý</span>
                                </ListItemButton>
                            </Link>
                            <Link href="/ticket-01/office" passHref className='itemMenu'>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <span>5.9 Văn phòng</span>
                                </ListItemButton>
                            </Link>
                            <Link href="/ticket-01/telecom-number" passHref className='itemMenu'>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <span>5.10 Số máy tổng đài</span>
                                </ListItemButton>
                            </Link>
                        </List>
                    </Collapse>
                </List>

                <List>
                    <ListItemButton onClick={handleClick7} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ListItemIcon>
                                <Camera />
                            </ListItemIcon>
                            <span>Hệ thống</span>
                        </div>
                        {open7 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open7} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>6.1 Tùy chỉnh in vé</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>6.2 Tùy chỉnh in sơ đồ ghế</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>6.3 Tùy chỉnh in hàng</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>6.4 Cấu hình gửi tin nhắn</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>6.5 Cấu hình gửi gmail</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>6.6 Lệnh vận chuyển hàng hóa</span>
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>

                <List>
                    <ListItemButton onClick={handleClick8} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ListItemIcon>
                                <PanTool />
                            </ListItemIcon>
                            <span>CSKH</span>
                        </div>
                        {open8 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open8} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>7.1 Báo cáo số dư tài khoản</span>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <span>7.2 Đăng ký sử dụng VietQR</span>
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}
