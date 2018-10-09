(async()=>{
	const 	icons=Object.assign(...Object.entries(await(await fetch`../json/icons.json`).json()).filter(([key,value])=>
/*			value.variants&&!value.rejected&&!value.retired&&!value.categories.includes(`google`)&&!value.categories.includes(`logos`)*/
			!value.rejected&&!value.retired&&!value.categories.includes(`google`)&&!value.categories.includes(`logos`)
		).map(([key,value])=>
			({[key]:value})
		));
		body=document.querySelector(`tbody`),
		count=cell=0,
		variants={
			outline:0,
			round:0,
			sharp:0
		},
		types=Object.keys(variants),
		counters=document.querySelectorAll(`tfoot td`);
	let include,key,path,svg,tr,td,type,use;
	for(key in icons)
		if(icons.hasOwnProperty(key)&&!types.some(type=>key.endsWith(`-`+type))){
			++count;
			tr=tr?tr.cloneNode(0):document.createElement(`tr`);
			tr.classList.toggle(`google`,icons[key].contributor===`google`);
			if(td)
				td=td.cloneNode(0);
			else{
				td=document.createElement(`td`);
				td.classList.add(`oh`,`toe`,`wsnw`);
			}
			td.append(document.createTextNode(key));
			tr.append(td);
			td=td.cloneNode(0);
			if(svg){
				svg=svg.cloneNode(0);
				svg.classList.remove(`exclude`,`missing`);
				path=path.cloneNode(0);
			}else{
				svg=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`),
				path=document.createElementNS(`http://www.w3.org/2000/svg`,`path`),
				svg.classList.add(`vam`);
				svg.setAttribute(`viewBox`,`0 0 24 24`);
			}
			path.setAttribute(`d`,icons[key].data);
			svg.append(path);
			td.append(svg);
			tr.append(td);
			types.forEach(type=>{
				if(variants.hasOwnProperty(type)){
					td=td.cloneNode(0);
					svg=svg.cloneNode(0);
					if(icons.hasOwnProperty(key+`-`+type)){
						++variants[type];
						svg.classList.remove(`exclude`,`missing`);
						path=path.cloneNode(0);
						path.setAttribute(`d`,icons[key+`-`+type].data);
						svg.append(path);
					}else{
/*						include=icons[key].variants.includes(type);*/
						include=!icons[key].variants||icons[key].variants.includes(type);
						svg.classList.toggle(`exclude`,!include);
						svg.classList.toggle(`missing`,include);
						use=use?use.cloneNode(0):document.createElementNS(`http://www.w3.org/2000/svg`,`use`);
						use.setAttribute(`href`,`#${include?`close-circle`:`cancel`}`);
						svg.append(use);
					}
					td.append(svg);
					tr.append(td);
				}
			});
			body.appendChild(tr);
		}
	counters[++cell].firstChild.nodeValue=count;
	for(type in variants)
		if(variants.hasOwnProperty(type))
			counters[++cell].firstChild.nodeValue=variants[type];
})();