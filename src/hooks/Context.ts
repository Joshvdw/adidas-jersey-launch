'use client';

import { createContext } from "react";

type ContextType = (functionName: string) => any;

export const Context = createContext<ContextType | null>(null);