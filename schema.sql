-- Schema for CrusherFlow Building Material Supplier Billing System

-- WARNING: This will delete ALL existing data in these tables!
DROP TABLE IF EXISTS public.daily_entries CASCADE;
DROP TABLE IF EXISTS public.printed_bills CASCADE;

-- 1. Daily Entries Table
CREATE TABLE IF NOT EXISTS public.daily_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    vehicle_no TEXT NOT NULL,
    date DATE NOT NULL,
    driver_name TEXT,
    company_name TEXT NOT NULL,
    destination TEXT,
    bill_no TEXT NOT NULL,
    material TEXT NOT NULL,
    quantity NUMERIC NOT NULL,
    crusher_rate NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Printed Bills Table
CREATE TABLE IF NOT EXISTS public.printed_bills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    gst_bill_no TEXT NOT NULL,
    company_name TEXT NOT NULL,
    address TEXT,
    party_gstin_no TEXT,
    month TEXT NOT NULL,
    year TEXT NOT NULL,
    subtotal NUMERIC NOT NULL,
    gst_amount NUMERIC NOT NULL,
    grand_total NUMERIC NOT NULL,
    items JSONB NOT NULL,
    printed_at DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security) and add open policies for easy frontend access
-- Note: In a production environment, you should secure these properly with auth.
ALTER TABLE public.daily_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.printed_bills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.daily_entries FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.daily_entries FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.daily_entries FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.daily_entries FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON public.printed_bills FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.printed_bills FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.printed_bills FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.printed_bills FOR DELETE USING (true);

-- IF you already created the tables before, run these ALTER statements to add the new columns:
-- ALTER TABLE public.printed_bills ADD COLUMN IF NOT EXISTS address TEXT;
-- ALTER TABLE public.printed_bills ADD COLUMN IF NOT EXISTS party_gstin_no TEXT;
