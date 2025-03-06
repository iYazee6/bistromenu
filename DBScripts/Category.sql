CREATE TABLE public.category (
	id int GENERATED ALWAYS AS IDENTITY NOT NULL,
	title varchar NULL,
	iconname varchar NULL,
	color varchar NULL,
	CONSTRAINT category_pk PRIMARY KEY (id)
);



insert into category (title)
select CATEGORY 
from MENU 
group by category;


update category c 
set iconName = 'croissonet', color='pink'
where c.title = 'Breakfast';

update category c 
set iconName = 'FaCoffee', color='lightblue'
where c.title = 'drinks';

update category c 
set iconName = 'soup', color='gray'
where c.title = 'Soups';

update category c 
set iconName = 'bi BiSolidSushi', color='perple'
where c.title = 'Sushi';

update category c 
set iconName = 'TbFiles', color='lightgreen'
where c.title = 'Orders';