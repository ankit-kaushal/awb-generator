import { Layout, Menu, Avatar } from 'antd';
import {
	UserOutlined,
	// eslint-disable-next-line import/no-unresolved
} from '@ant-design/icons';
import React, { useState } from 'react';
import Link from 'next/link';
import navData from './sideNavContent';
import style from './style.module.css';

const { Header } = Layout;

function PageSider() {
	const [collapsed, setCollapsed] = useState(false);
	const { Sider } = Layout;

	const profileImage = () => <UserOutlined />;

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={(value) => setCollapsed(value)}
			style={{
				overflow: 'auto',
				height: '100vh',
			}}
		>
			<Menu theme="dark" mode="inline">
				<Header
					className="site-layout-background"
					style={{ color: 'white', paddingLeft: '20px' }}
				>
					<strong>
						<Link href="/admin">Docreator</Link>
					</strong>
				</Header>

				{navData.map((data) => (
					<Menu.Item key={data.path} icon={data.icon}>
						<Link href={data.path}>{data.name}</Link>
					</Menu.Item>
				))}
			</Menu>
			<div type="primary" className={style.foot}>
				<div className={style.font}>
					<Avatar icon={profileImage()} style={{ marginRight: '10px' }} />
				</div>
			</div>
		</Sider>
	);
}

export default PageSider;
