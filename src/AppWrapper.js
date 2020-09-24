import React from 'react';

import { UserProvider } from './contexts/UserContext';
import { WalletProvider } from './contexts/WalletContext';
import { MenuProvider } from './contexts/MenuContext';
import { SwiperProvider } from './contexts/SwiperContext';

import App from './App';

function AppWrapper() {
	return (
		<UserProvider>
			<WalletProvider>
				<MenuProvider>
					<SwiperProvider>
						<App />
					</SwiperProvider>
				</MenuProvider>
			</WalletProvider>
		</UserProvider>
	);
}

export default AppWrapper;
