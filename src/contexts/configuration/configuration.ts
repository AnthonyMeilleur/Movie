import { createContext } from 'react';

import { IConfiguration } from '../../services/configuration/configuration';

export default createContext<Partial<IConfiguration>>({});
