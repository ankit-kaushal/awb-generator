import {
	LayoutOutlined,
	FolderViewOutlined,
	CoffeeOutlined,
	HomeOutlined,
	// eslint-disable-next-line import/no-unresolved
} from '@ant-design/icons';

const navRoute = ['/', '/sample', '/admin/datastore'];

const navData = [
	{
		name: 'Home',
		path: '/',
		icon: <HomeOutlined />,
	},
	{
		name: 'AWB Generator',
		path: '/generate',
		icon: <LayoutOutlined />,
	},
	{
		name: 'AWB Sample',
		path: '/sample',
		icon: <FolderViewOutlined />,
	},
	{
		name: 'Support',
		path: 'https://www.buymeacoffee.com/ankitkaushal',
		icon: <CoffeeOutlined />,
	},
];
export { navRoute };
export default navData;
