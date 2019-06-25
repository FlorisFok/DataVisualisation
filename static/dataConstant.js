// JSON data

const nodeData = {'name': '',
 'children': [{'name': 'Centrum',
   'children': [{'name': 'Burgwallen-Oude Zijde',
     'children': [{'name': 'Kop Zeedijk', 'size': 80490},
      {'name': 'BG-terrein', 'size': 101294},
      {'name': 'Oude Kerk', 'size': 92630},
      {'name': 'Burgwallen Oost', 'size': 72479},
      {'name': 'Nes', 'size': 57838}]},
    {'name': 'Burgwallen-Nieuwe Zijde',
     'children': [{'name': 'Stationsplein', 'size': 260407},
      {'name': 'Hemelrijk', 'size': 62939},
      {'name': 'Spuistraat Noord', 'size': 56780},
      {'name': 'Nieuwe Kerk', 'size': 84185},
      {'name': 'Spuistraat Zuid', 'size': 67106},
      {'name': 'Kalverdriehoek', 'size': 60379},
      {'name': 'Nieuwendijk Noord', 'size': 66004},
      {'name': 'Begijnhofbuurt', 'size': 70609}]},
    {'name': 'Grachtengordel-West',
     'children': [{'name': 'Langestraat', 'size': 123316},
      {'name': 'Leliegracht', 'size': 173446},
      {'name': 'Felix Meritisbuurt', 'size': 203183},
      {'name': 'Leidsegracht Noord', 'size': 69128}]},
    {'name': 'Grachtengordel-Zuid',
     'children': [{'name': 'Spiegelbuurt', 'size': 94255},
      {'name': 'Gouden Bocht', 'size': 55504},
      {'name': 'Van Loonbuurt', 'size': 153344},
      {'name': 'Amstelveldbuurt', 'size': 147812},
      {'name': 'Rembrandtpleinbuurt', 'size': 76833},
      {'name': 'Leidsegracht Zuid', 'size': 68633},
      {'name': 'Reguliersbuurt', 'size': 45461}]},
    {'name': 'Nieuwmarkt Lastage',
     'children': [{'name': 'Scheepvaarthuisbuurt', 'size': 107796},
      {'name': 'Rapenburg', 'size': 165957},
      {'name': 'Lastage', 'size': 77790},
      {'name': 'Uilenburg', 'size': 106901},
      {'name': 'Valkenburg', 'size': 73590},
      {'name': 'Zuiderkerkbuurt', 'size': 91005},
      {'name': 'Waterloopleinbuurt', 'size': 129558},
      {'name': 'Oosterdokseiland', 'size': 242955},
      {'name': 'Nieuwmarkt', 'size': 71266}]},
    {'name': 'Haarlemmerbuurt',
     'children': [{'name': 'Haarlemmerbuurt West', 'size': 117365},
      {'name': 'Westelijke eilanden', 'size': 216546},
      {'name': 'Planciusbuurt Noord', 'size': 24126},
      {'name': 'Planciusbuurt Zuid', 'size': 17358},
      {'name': 'Westerdokseiland', 'size': 337796},
      {'name': 'Haarlemmerbuurt Oost', 'size': 101322}]},
    {'name': 'Jordaan',
     'children': [{'name': 'Driehoekbuurt', 'size': 106081},
      {'name': 'Bloemgrachtbuurt', 'size': 127089},
      {'name': 'Marnixbuurt Noord', 'size': 72103},
      {'name': 'Marnixbuurt Midden', 'size': 21598},
      {'name': 'Elandsgrachtbuurt', 'size': 207890},
      {'name': 'Passeerdersgrachtbuurt', 'size': 54677},
      {'name': 'Groenmarktkadebuurt', 'size': 49460},
      {'name': 'Marnixbuurt Zuid', 'size': 51246},
      {'name': 'Zaagpoortbuurt', 'size': 37967},
      {'name': 'Anjeliersbuurt Noord', 'size': 98810},
      {'name': 'Anjeliersbuurt Zuid', 'size': 119598}]},
    {'name': 'De Weteringschans',
     'children': [{'name': 'Leidsebuurt Noordwest', 'size': 28543},
      {'name': 'Leidsebuurt Zuidwest', 'size': 32565},
      {'name': 'Leidsebuurt Noordoost', 'size': 61557},
      {'name': 'Leidsebuurt Zuidoost', 'size': 51083},
      {'name': 'Weteringbuurt', 'size': 136272},
      {'name': 'Den Texbuurt', 'size': 112933},
      {'name': 'Utrechtsebuurt Zuid', 'size': 68778},
      {'name': 'Frederikspleinbuurt', 'size': 155977}]},
    {'name': 'Weesperbuurt Plantage',
     'children': [{'name': 'Weesperbuurt', 'size': 279099},
      {'name': 'Sarphatistrook', 'size': 214489},
      {'name': 'Plantage', 'size': 377673},
      {'name': 'Alexanderplein', 'size': 48606}]},
    {'name': 'Oostelijke Eilanden Kadijken',
     'children': [{'name': 'Kattenburg', 'size': 120739},
      {'name': 'Wittenburg', 'size': 180451},
      {'name': 'Kadijken', 'size': 218265},
      {'name': 'Marine-Etablissement', 'size': 271557},
      {'name': 'Oostenburg', 'size': 247466},
      {'name': 'Czaar Peterbuurt', 'size': 107695},
      {'name': 'Het Funen', 'size': 91799},
      {'name': 'Kazernebuurt', 'size': 66034}]}]},
  // {'name': 'Westpoort',
  //  'children': [{'name': 'Westelijk Havengebied',
  //    'children': [{'name': 'Westhaven Zuid', 'size': 469952},
  //     {'name': 'Coenhaven/Mercuriushaven', 'size': 3022480},
  //     {'name': 'Alfa-driehoek', 'size': 406268},
  //     {'name': 'Petroleumhaven', 'size': 3217160},
  //     {'name': 'Westhaven Noord', 'size': 5696140},
  //     {'name': 'Vervoerscentrum', 'size': 700278},
  //     {'name': 'Amerikahaven', 'size': 10121500},
  //     {'name': 'Afrikahaven', 'size': 5357830}]}]},
  {'name': 'West',
   'children': [{'name': 'Houthavens',
     'children': [{'name': 'Houthavens Oost', 'size': 256248},
      {'name': 'Houthavens West', 'size': 663382}]},
    {'name': 'Spaarndammer- en Zeeheldenbuurt',
     'children': [{'name': 'Zeeheldenbuurt', 'size': 103341},
      {'name': 'Spaarndammerbuurt Noordoost', 'size': 111790},
      {'name': 'Spaarndammerbuurt Zuidoost', 'size': 56728},
      {'name': 'Spaarndammerbuurt Zuidwest', 'size': 75794},
      {'name': 'Spaarndammerbuurt Midden', 'size': 57333},
      {'name': 'Westergasfabriek', 'size': 255119},
      {'name': 'Spaarndammerbuurt Noordwest', 'size': 119192},
      {'name': 'Overbraker Binnenpolder', 'size': 631267}]},
    {'name': 'Staatsliedenbuurt',
     'children': [{'name': 'De Wittenbuurt Noord', 'size': 74658},
      {'name': 'De Wittenbuurt Zuid', 'size': 46332},
      {'name': 'Staatsliedenbuurt Noordoost', 'size': 68140},
      {'name': 'Fannius Scholtenbuurt', 'size': 110993},
      {'name': 'Westerstaatsman', 'size': 100228},
      {'name': 'Buyskade', 'size': 130464}]},
    {'name': 'Centrale Markt',
     'children': [{'name': 'Ecowijk', 'size': 65844},
      {'name': 'Markthallen', 'size': 283035},
      {'name': 'Bedrijvencentrum Westerkwartier', 'size': 151794},
      {'name': 'Marcanti', 'size': 71869}]},
    {'name': 'Frederik Hendrikbuurt',
     'children': [{'name': 'Frederik Hendrikbuurt Zuidwest', 'size': 84195},
      {'name': 'Frederik Hendrikbuurt Noord', 'size': 212339},
      {'name': 'Frederik Hendrikbuurt Zuidoost', 'size': 124672}]},
    {'name': 'Da Costabuurt',
     'children': [{'name': 'Da Costabuurt Noord', 'size': 258498}]},
    {'name': 'Kinkerbuurt',
     'children': [{'name': 'Bellamybuurt Noord', 'size': 110078},
      {'name': 'Bellamybuurt Zuid', 'size': 163793}]},
    {'name': 'Van Lennepbuurt',
     'children': [{'name': 'Da Costabuurt Zuid', 'size': 88445},
      {'name': 'Borgerbuurt', 'size': 124822},
      {'name': 'Lootsbuurt', 'size': 74363}]},
    {'name': 'Helmersbuurt',
     'children': [{'name': 'Helmersbuurt Oost', 'size': 112498},
      {'name': 'WG-terrein', 'size': 167807},
      {'name': 'Cremerbuurt Oost', 'size': 68958}]},
    {'name': 'Overtoomse Sluis',
     'children': [{'name': 'Cremerbuurt West', 'size': 206003},
      {'name': 'Vondelparkbuurt West', 'size': 102625}]},
    {'name': 'Vondelbuurt',
     'children': [{'name': 'Vondelparkbuurt Oost', 'size': 130108},
      {'name': 'Vondelparkbuurt Midden', 'size': 91103}]},
    {'name': 'Sloterdijk',
     'children': [{'name': 'Bedrijventerrein Sloterdijk I', 'size': 681212},
      {'name': 'Woon- en Groengebied Sloterdijk', 'size': 532171}]},
    {'name': 'Landlust',
     'children': [{'name': 'Bedrijventerrein Landlust', 'size': 140021},
      {'name': 'Bosleeuw', 'size': 342711},
      {'name': 'Landlust Zuid', 'size': 216822},
      {'name': 'Erasmusparkbuurt Oost', 'size': 90709},
      {'name': 'Gibraltarbuurt', 'size': 199994},
      {'name': 'Landlust Noord', 'size': 98072}]},
    {'name': 'Erasmuspark',
     'children': [{'name': 'Erasmusparkbuurt West', 'size': 336250},
      {'name': 'Robert Scottbuurt Oost', 'size': 68863}]},
    {'name': 'De Kolenkit',
     'children': [{'name': 'Kolenkitbuurt Zuid', 'size': 128037},
      {'name': 'Kolenkitbuurt Noord', 'size': 298892},
      {'name': 'Robert Scottbuurt West', 'size': 148497},
      {'name': 'Laan van Spartaan', 'size': 165758}]},
    {'name': 'Geuzenbuurt',
     'children': [{'name': 'Geuzenhofbuurt', 'size': 93667},
      {'name': 'Trompbuurt', 'size': 123075},
      {'name': 'Pieter van der Doesbuurt', 'size': 74972}]},
    {'name': 'Van Galenbuurt',
     'children': [{'name': 'John Franklinbuurt', 'size': 74894},
      {'name': 'Jan Maijenbuurt', 'size': 78377},
      {'name': 'Orteliusbuurt Noord', 'size': 42613},
      {'name': 'Mercatorpark', 'size': 98165}]},
    {'name': 'Hoofdweg',
     'children': [{'name': 'Balboaplein', 'size': 120108},
      {'name': 'Columbusplein', 'size': 155084},
      {'name': 'Orteliusbuurt Midden', 'size': 60897},
      {'name': 'Orteliusbuurt Zuid', 'size': 83635}]},
    {'name': 'Westindische Buurt',
     'children': [{'name': 'Paramariboplein', 'size': 171299},
      {'name': 'Postjeskade', 'size': 175544}]},
    {'name': 'Chassébuurt',
     'children': [{'name': 'Kortenaerkwartier', 'size': 99493},
      {'name': 'Filips van Almondekwartier', 'size': 45055},
      {'name': 'De Wester Quartier', 'size': 77507},
      {'name': 'Van Brakelkwartier', 'size': 53595}]}]},
  {'name': 'Oost',
   'children': [{'name': 'Weesperzijde',
     'children': [{'name': 'Swammerdambuurt', 'size': 140917},
      {'name': 'Weesperzijde Midden Zuid', 'size': 236435},
      {'name': 'Parooldriehoek', 'size': 69352}]},
    {'name': 'Oosterparkbuurt',
     'children': [{'name': 'Oosterparkbuurt Noordwest', 'size': 220443},
      {'name': 'Oosterpark', 'size': 253968},
      {'name': 'Oosterparkbuurt Zuidoost', 'size': 157594},
      {'name': 'Oosterparkbuurt Zuidwest', 'size': 121888}]},
    {'name': 'Dapperbuurt',
     'children': [{'name': 'Dapperbuurt Noord', 'size': 211196},
      {'name': 'Dapperbuurt Zuid', 'size': 174086},
      {'name': 'Oostpoort', 'size': 228602}]},
    {'name': 'Transvaalbuurt',
     'children': [{'name': 'Transvaalbuurt West', 'size': 179142},
      {'name': 'Transvaalbuurt Oost', 'size': 199502}]},
    {'name': 'Indische Buurt West',
     'children': [{'name': 'Noordwestkwadrant Indische buurt Noord',
       'size': 176059},
      {'name': 'Noordwestkwadrant Indische buurt Zuid', 'size': 145586},
      {'name': 'Zuidwestkwadrant Indische buurt', 'size': 159628}]},
    {'name': 'Indische Buurt Oost',
     'children': [{'name': 'Noordoostkwadrant Indische buurt', 'size': 267102},
      {'name': 'Zuidoostkwadrant Indische buurt', 'size': 140406},
      {'name': 'Zeeburgerdijk Oost', 'size': 126977},
      {'name': 'Flevopark', 'size': 760096}]},
    {'name': 'Oostelijk Havengebied',
     'children': [{'name': 'Oostelijke Handelskade', 'size': 357558},
      {'name': 'Java-eiland', 'size': 713329},
      {'name': 'KNSM-eiland', 'size': 1034750},
      {'name': 'Sporenburg', 'size': 364434},
      {'name': 'Borneo', 'size': 267331},
      {'name': 'Entrepot-Noordwest', 'size': 127376},
      {'name': 'Architectenbuurt', 'size': 142168},
      {'name': 'Bedrijvengebied Veelaan', 'size': 51214},
      {'name': 'Rietlanden', 'size': 344108},
      {'name': 'Bedrijvengebied Cruquiusweg', 'size': 310369},
      {'name': 'Bedrijvengebied Zeeburgerkade', 'size': 99542}]},
    {'name': 'Zeeburgereiland Nieuwe Diep',
     'children': [{'name': 'Zeeburgereiland Noordwest', 'size': 486587},
      {'name': 'Zeeburgereiland Zuidoost', 'size': 500397},
      {'name': 'RI Oost terrein', 'size': 421905},
      {'name': 'Zeeburgereiland Noordoost', 'size': 542327},
      {'name': 'Zeeburgereiland Zuidwest', 'size': 276096},
      {'name': 'Nieuwe Diep Diemerpark', 'size': 2399790}]},
    {'name': 'IJburg West',
     'children': [{'name': 'Steigereiland Noord', 'size': 864589},
      {'name': 'Steigereiland Zuid', 'size': 403588},
      {'name': 'Haveneiland Zuidwest Rieteiland West', 'size': 441249},
      {'name': 'Haveneiland Noordwest', 'size': 667600},
      {'name': 'Haveneiland Noordoost', 'size': 841024}]},
    {'name': 'IJburg Oost',
     'children': [{'name': 'Middeneiland Zuidoost', 'size': 190791},
      {'name': 'Middeneiland Noordwest', 'size': 450326},
      {'name': 'Middeneiland Noordoost', 'size': 739378},
      {'name': 'Buiteneiland', 'size': 2213700},
      {'name': 'Strandeiland', 'size': 704657},
      {'name': 'Middeneiland Zuidwest', 'size': 200760},
      {'name': 'Centrumeiland', 'size': 486368}]},
    {'name': 'IJburg Zuid',
     'children': [{'name': 'Rieteiland Oost', 'size': 206368},
      {'name': 'Haveneiland Noord', 'size': 147456},
      {'name': 'Haveneiland Oost', 'size': 602024}]},
    {'name': 'Frankendael',
     'children': [{'name': 'De Eenhoorn', 'size': 180221},
      {'name': 'Don Bosco', 'size': 162587},
      {'name': 'Frankendael', 'size': 290403},
      {'name': 'De Wetbuurt', 'size': 287637},
      {'name': 'Tuindorp Frankendael', 'size': 360612},
      {'name': 'Van der Kunbuurt', 'size': 90552},
      {'name': 'Julianapark', 'size': 191935},
      {'name': 'Tuindorp Amstelstation', 'size': 110022}]},
    {'name': 'Middenmeer',
     'children': [{'name': 'Linnaeusparkbuurt', 'size': 178158},
      {'name': 'Middenmeer Noord', 'size': 185583},
      {'name': 'Middenmeer Zuid', 'size': 396012},
      {'name': 'Sportpark Middenmeer Zuid', 'size': 211320},
      {'name': 'Sportpark Middenmeer Noord', 'size': 251024},
      {'name': 'Science Park Noord', 'size': 417834},
      {'name': 'Park de Mees', 'size': 263634},
      {'name': 'Sportpark Voorland', 'size': 269462},
      {'name': 'Science Park Zuid', 'size': 848664}]},
    {'name': 'Betondorp',
     'children': [{'name': 'Nieuwe Oosterbegraafplaats', 'size': 394066},
      {'name': 'Betondorp', 'size': 457985},
      {'name': 'Drieburg', 'size': 281846}]},
    {'name': 'Omval Overamstel',
     'children': [{'name': 'Weespertrekvaart', 'size': 482447},
      {'name': 'Amstelglorie', 'size': 506325},
      {'name': 'Overamstel', 'size': 1193330},
      {'name': 'Amstelkwartier Noord', 'size': 368218},
      {'name': 'De Omval', 'size': 147924},
      {'name': 'Amstelkwartier Zuid', 'size': 243461},
      {'name': 'Amstelkwartier West', 'size': 255499}]}]},
  {'name': 'Zuid',
   'children': [{'name': 'Zuidas',
     'children': [{'name': 'RAI', 'size': 370584},
      {'name': 'Zuidas Noord', 'size': 826100},
      {'name': 'Vivaldi', 'size': 289755},
      {'name': 'Zuidas Zuid', 'size': 216772},
      {'name': 'VU-kwartier', 'size': 463282}]},
    {'name': 'Oude Pijp',
     'children': [{'name': 'Hemonybuurt', 'size': 139968},
      {'name': 'Gerard Doubuurt', 'size': 106349},
      {'name': 'Frans Halsbuurt', 'size': 121403},
      {'name': 'Hercules Seghersbuurt', 'size': 84502},
      {'name': 'Sarphatiparkbuurt', 'size': 227571}]},
    {'name': 'Nieuwe Pijp',
     'children': [{'name': 'Willibrordusbuurt', 'size': 124015},
      {'name': 'Van der Helstpleinbuurt', 'size': 136228},
      {'name': 'Lizzy Ansinghbuurt', 'size': 127547},
      {'name': 'Cornelis Troostbuurt', 'size': 156513}]},
    {'name': 'Zuid Pijp',
     'children': [{'name': 'Diamantbuurt', 'size': 167160},
      {'name': 'Burgemeester Tellegenbuurt Oost', 'size': 121441},
      {'name': 'Burgemeester Tellegenbuurt West', 'size': 102277}]},
    {'name': 'Hoofddorppleinbuurt',
     'children': [{'name': 'Surinamepleinbuurt', 'size': 89405},
      {'name': 'Westlandgrachtbuurt', 'size': 188061},
      {'name': 'Aalsmeerwegbuurt West', 'size': 105160},
      {'name': 'Legmeerpleinbuurt', 'size': 75549},
      {'name': 'Aalsmeerwegbuurt Oost', 'size': 118189},
      {'name': 'Bedrijventerrein Schinkel', 'size': 380229}]},
    {'name': 'Schinkelbuurt',
     'children': [{'name': 'Schinkelbuurt Noord', 'size': 108056},
      {'name': 'Schinkelbuurt Zuid', 'size': 238240}]},
    {'name': 'Willemspark',
     'children': [{'name': 'Valeriusbuurt Oost', 'size': 120626},
      {'name': 'Valeriusbuurt West', 'size': 141029},
      {'name': 'Willemsparkbuurt Noord', 'size': 189215},
      {'name': 'Vondelpark West', 'size': 247564}]},
    {'name': 'Museumkwartier',
     'children': [{'name': 'Johannnes Vermeerbuurt', 'size': 159806},
      {'name': 'P.C. Hooftbuurt', 'size': 113932},
      {'name': 'Concertgebouwbuurt', 'size': 132001},
      {'name': 'Cornelis Schuytbuurt', 'size': 194818},
      {'name': 'Banpleinbuurt', 'size': 112323},
      {'name': 'Hondecoeterbuurt', 'size': 126082},
      {'name': 'Harmoniehofbuurt', 'size': 113807},
      {'name': 'Museumplein', 'size': 134120},
      {'name': 'Vondelpark Oost', 'size': 236976},
      {'name': 'Duivelseiland', 'size': 61557}]},
    {'name': 'Stadionbuurt',
     'children': [{'name': 'Bertelmanpleinbuurt', 'size': 59581},
      {'name': 'Marathonbuurt Oost', 'size': 155316},
      {'name': 'Marathonbuurt West', 'size': 121158},
      {'name': 'Olympisch Stadion', 'size': 231283},
      {'name': 'IJsbaanpad', 'size': 296086},
      {'name': 'Van Tuyllbuurt', 'size': 210402}]},
    {'name': 'Apollobuurt',
     'children': [{'name': 'Diepenbrockbuurt', 'size': 220648},
      {'name': 'Beethovenbuurt', 'size': 152279},
      {'name': 'Hiltonbuurt', 'size': 112944},
      {'name': 'Minervabuurt Noord', 'size': 144110},
      {'name': 'Minervabuurt Midden', 'size': 150420},
      {'name': 'Minervabuurt Zuid', 'size': 162386}]},
    {'name': 'Scheldebuurt',
     'children': [{'name': 'Wielingenbuurt', 'size': 150987},
      {'name': 'Scheldebuurt West', 'size': 255588},
      {'name': 'Scheldebuurt Midden', 'size': 160198},
      {'name': 'Scheldebuurt Oost', 'size': 140553},
      {'name': 'Veluwebuurt', 'size': 130847},
      {'name': 'Kop Zuidas', 'size': 169429}]},
    {'name': 'IJselbuurt',
     'children': [{'name': 'IJselbuurt West', 'size': 133233},
      {'name': 'IJselbuurt Oost', 'size': 158894}]},
    {'name': 'Rijnbuurt',
     'children': [{'name': 'Kromme Mijdrechtbuurt', 'size': 184869},
      {'name': 'Rijnbuurt Oost', 'size': 232583},
      {'name': 'Rijnbuurt Midden', 'size': 285461},
      {'name': 'Rijnbuurt West', 'size': 79414},
      {'name': 'Zorgvlied', 'size': 320932}]},
    {'name': 'Prinses Irenebuurt',
     'children': [{'name': 'Prinses Irenebuurt', 'size': 266469},
      {'name': 'Beatrixpark', 'size': 166601}]},
    {'name': 'Buitenveldert-West',
     'children': [{'name': 'Amsterdamse Bos', 'size': 1317140},
      {'name': 'Gelderlandpleinbuurt', 'size': 464205},
      {'name': 'Buitenveldert Midden Zuid', 'size': 543543},
      {'name': 'Buitenveldert Zuidwest', 'size': 749477},
      {'name': 'Zuiderhof', 'size': 207792},
      {'name': 'Buitenveldert West Midden', 'size': 270227}]},
    {'name': 'Buitenveldert-Oost',
     'children': [{'name': 'De Klenckebuurt', 'size': 139081},
      {'name': 'Buitenveldert Oost Midden', 'size': 298621},
      {'name': 'Buitenveldert Zuidoost', 'size': 643193},
      {'name': 'Amstelpark', 'size': 619791}]}]},
  {'name': 'Nieuw west',
   'children': [{'name': 'Bedrijventerrein Sloterdijk',
     'children': [{'name': 'Bretten West', 'size': 1494780},
      {'name': 'Bretten Oost', 'size': 842575},
      {'name': 'Sloterdijk II', 'size': 462042},
      {'name': 'Sloterdijk III Oost', 'size': 795228},
      {'name': 'Sloterdijk III West', 'size': 2114310},
      {'name': 'De Heining', 'size': 1125580},
      {'name': 'Teleport', 'size': 864501}]},
    {'name': 'Slotermeer-Noordoost',
     'children': [{'name': 'Buurt 3', 'size': 699988},
      {'name': 'Buurt 2', 'size': 315102}]},
    {'name': 'Slotermeer-Zuidwest',
     'children': [{'name': 'Slotermeer Zuid', 'size': 434244},
      {'name': 'Noordoever Sloterplas', 'size': 402112},
      {'name': 'Buurt 4 Oost', 'size': 359221},
      {'name': 'Buurt 5 Noord', 'size': 231468},
      {'name': 'Sloterpark', 'size': 1061700},
      {'name': 'Buurt 5 Zuid', 'size': 320548}]},
    {'name': 'Geuzenveld',
     'children': [{'name': 'Buurt 6', 'size': 271028},
      {'name': 'Buurt 7', 'size': 297767},
      {'name': 'Buurt 8', 'size': 268535},
      {'name': 'Buurt 9', 'size': 434922},
      {'name': 'Eendrachtspark', 'size': 140129}]},
    {'name': 'Eendracht',
     'children': [{'name': 'Osdorper Binnenpolder', 'size': 2100470},
      {'name': 'Buurt 10', 'size': 320952}]},
    {'name': 'Lutkemeer Ookmeer',
     'children': [{'name': 'Ookmeer', 'size': 725431},
      {'name': 'Osdorper Bovenpolder', 'size': 2602960},
      {'name': 'Bedrijvenpark Lutkemeer', 'size': 2359120}]},
    {'name': 'Osdorp-Oost',
     'children': [{'name': 'Calandlaan Lelylaan', 'size': 275360},
      {'name': 'Osdorp Zuidoost', 'size': 519366},
      {'name': 'Wildeman', 'size': 330000},
      {'name': 'Meer en Oever', 'size': 233504},
      {'name': 'Osdorpplein', 'size': 412383}]},
    {'name': 'Osdorp-Midden',
     'children': [{'name': 'Osdorp Midden Noord', 'size': 215541},
      {'name': 'Osdorp Midden Zuid', 'size': 258379},
      {'name': 'Zuidwestkwadrant Osdorp Noord', 'size': 240774},
      {'name': 'Zuidwestkwadrant Osdorp Zuid', 'size': 402284}]},
    {'name': 'De Punt',
     'children': [{'name': 'De Punt', 'size': 481657},
      {'name': 'Bedrijvencentrum Osdorp', 'size': 117961}]},
    {'name': 'Middelveldsche Akerpolder',
     'children': [{'name': 'Middelveldsche Akerpolder', 'size': 352026},
      {'name': 'De Aker West', 'size': 574212},
      {'name': 'De Aker Oost', 'size': 718473}]},
    {'name': 'Slotervaart Noord',
     'children': [{'name': 'Oostoever Sloterplas', 'size': 647664},
      {'name': 'Emanuel van Meterenbuurt', 'size': 584747},
      {'name': 'Jacob Geelbuurt', 'size': 321310}]},
    {'name': 'Overtoomse Veld',
     'children': [{'name': 'Overtoomse Veld Noord', 'size': 344673},
      {'name': 'Rembrandtpark Noord', 'size': 304271},
      {'name': 'Rembrandtpark Zuid', 'size': 316660},
      {'name': 'Johan Jongkindbuurt', 'size': 86905},
      {'name': 'Lucas Andreasziekenhuis', 'size': 184923},
      {'name': 'Overtoomse Veld Zuid', 'size': 306464}]},
    {'name': 'Westlandgracht',
     'children': [{'name': 'Koningin Wilhelminaplein', 'size': 263637},
      {'name': 'Andreasterrein', 'size': 177407},
      {'name': 'Delflandpleinbuurt Oost', 'size': 181654},
      {'name': 'Delflandpleinbuurt West', 'size': 340440},
      {'name': 'Riekerhaven', 'size': 416534},
      {'name': 'Schipluidenbuurt', 'size': 116474}]},
    {'name': 'Sloter- Riekerpolder',
     'children': [{'name': 'Riekerpolder', 'size': 645668},
      {'name': 'Park Haagseweg', 'size': 121305},
      {'name': 'Nieuw Sloten Noordwest', 'size': 373530},
      {'name': 'Nieuw Sloten Noordoost', 'size': 480227},
      {'name': 'Belgiëplein', 'size': 82888},
      {'name': 'Nieuw Sloten Zuidwest', 'size': 231665},
      {'name': 'Nieuw Sloten Zuidoost', 'size': 256133},
      {'name': 'Nieuwe Meer', 'size': 2273670},
      {'name': 'Sloterweg', 'size': 862588},
      {'name': 'Dorp Sloten', 'size': 612168}]},
    {'name': 'Slotervaart Zuid',
     'children': [{'name': 'Louis Crispijnbuurt', 'size': 373519},
      {'name': 'Jacques Veldmanbuurt', 'size': 308571},
      {'name': 'Medisch Centrum Slotervaart', 'size': 302064},
      {'name': 'Staalmanbuurt', 'size': 321147}]}]},
  {'name': 'Noord',
   'children': [{'name': 'Volewijck',
     'children': [{'name': 'Van der Pekbuurt', 'size': 579370},
      {'name': 'Bloemenbuurt Zuid', 'size': 370999},
      {'name': 'Bloemenbuurt Noord', 'size': 362666}]},
    {'name': 'IJplein Vogelbuurt',
     'children': [{'name': 'IJplein', 'size': 397505},
      {'name': 'Vogelbuurt Zuid', 'size': 341953},
      {'name': 'Vliegenbos', 'size': 395004},
      {'name': 'Vogelbuurt Noord', 'size': 318836}]},
    {'name': 'Tuindorp Nieuwendam',
     'children': [{'name': 'Tuindorp Nieuwendam West', 'size': 119768},
      {'name': 'Tuindorp Nieuwendam Oost', 'size': 350827}]},
    {'name': 'Tuindorp Buiksloot',
     'children': [{'name': 'Blauwe Zand', 'size': 172974}]},
    {'name': 'Nieuwendammerdijk Buiksloterdijk',
     'children': [{'name': 'Buiksloterdijk West', 'size': 26435},
      {'name': 'Nieuwendammerdijk Oost', 'size': 79352},
      {'name': 'Nieuwendammerdijk Zuid', 'size': 182869},
      {'name': 'Nieuwendammmerdijk West', 'size': 117804},
      {'name': 'Buiksloterdijk Oost', 'size': 26845}]},
    {'name': 'Tuindorp Oostzaan',
     'children': [{'name': 'Tuindorp Oostzaan West', 'size': 181544},
      {'name': 'Tuindorp Oostzaan Oost', 'size': 528791},
      {'name': 'Terrasdorp', 'size': 689207},
      {'name': 'De Bongerd', 'size': 300161}]},
    {'name': 'Oostzanerwerf',
     'children': [{'name': 'Walvisbuurt', 'size': 506740},
      {'name': 'Twiske West', 'size': 419323},
      {'name': 'Noorder IJplas', 'size': 1467860},
      {'name': 'Circus Kermisbuurt', 'size': 159021},
      {'name': 'Molenwijk', 'size': 303281},
      {'name': 'Oostzanerdijk', 'size': 465963}]},
    {'name': 'Kadoelen',
     'children': [{'name': 'Twiske Oost', 'size': 190604},
      {'name': 'Kadoelen', 'size': 1305410}]},
    {'name': 'Waterlandpleinbuurt',
     'children': [{'name': 'Markengouw Noord', 'size': 118374},
      {'name': 'Werengouw Noord', 'size': 163140},
      {'name': 'Werengouw Midden', 'size': 375722},
      {'name': 'Markengouw Midden', 'size': 405056},
      {'name': 'Markengouw Zuid', 'size': 226452},
      {'name': 'Werengouw Zuid', 'size': 220881}]},
    {'name': 'Buikslotermeer',
     'children': [{'name': 'Rode Kruisbuurt', 'size': 156264},
      {'name': 'Loenermark', 'size': 170981},
      {'name': 'Buikslotermeer Noord', 'size': 471173},
      {'name': 'De Kleine Wereld', 'size': 237812},
      {'name': 'Buikslotermeerplein', 'size': 234399},
      {'name': 'Plan van Gool', 'size': 282616}]},
    {'name': 'Banne Buiksloot',
     'children': [{'name': 'Banne Zuidwest', 'size': 372875},
      {'name': 'Banne Zuidoost', 'size': 525436},
      {'name': 'Banne Noordwest', 'size': 340870},
      {'name': 'Banne Noordoost', 'size': 456101},
      {'name': 'Marjoleinterrein', 'size': 34715},
      {'name': 'Buiksloterbreek', 'size': 99722}]},
    {'name': 'Noordelijke IJ-oevers West',
     'children': [{'name': 'Papaverweg', 'size': 695243},
      {'name': 'Cornelis Douwesterrein', 'size': 1389640},
      {'name': 'NDSM terrein', 'size': 794760},
      {'name': 'Buiksloterham', 'size': 658682},
      {'name': 'Overhoeks', 'size': 513212}]},
    {'name': 'Noordelijke IJ-oevers Oost',
     'children': [{'name': 'Bedrijventerrein Hamerstraat', 'size': 499286},
      {'name': 'Zamenhofstraat', 'size': 390041},
      {'name': 'Bedrijventerrein Nieuwendammerdijk', 'size': 219254}]},
    // {'name': 'Waterland',
    //  'children': [{'name': 'Schellingwoude West', 'size': 251166},
    //   {'name': 'Schellingwoude Oost', 'size': 921985},
    //   {'name': 'Schellingwoude Noord', 'size': 368563},
    //   {'name': 'Durgerdam', 'size': 6880440},
    //   {'name': 'Zwarte Gouw', 'size': 1598360},
    //   {'name': 'Ransdorp', 'size': 2272010},
    //   {'name': 'Holysloot', 'size': 19900100},
    //   {'name': 'Zunderdorp', 'size': 8864680},
    //   {'name': 'Noorderstrook West', 'size': 1017590},
    //   {'name': 'Noorderstrook Oost', 'size': 479312}]},
    {'name': 'Elzenhagen',
     'children': [{'name': 'Nintemanterrein', 'size': 39017},
      {'name': 'Elzenhagen Zuid', 'size': 312616},
      {'name': 'Elzenhagen Noord', 'size': 509152}]}]},
  {'name': 'Zuidoost',
   'children': [{'name': 'Amstel III Bullewijk',
     'children': [{'name': 'Amstel III deel A B Noord', 'size': 799537},
      {'name': 'Amstel III deel A B Zuid', 'size': 375393},
      {'name': 'AMC', 'size': 801524},
      {'name': 'Hoofdcentrum Zuidoost', 'size': 342088},
      {'name': 'Amstel III deel C D Noord', 'size': 989676},
      {'name': 'Amstel III deel C D Zuid', 'size': 360075},
      {'name': 'Hoge Dijk', 'size': 1605320}]},
    {'name': 'Bijlmer Centrum DFH',
     'children': [{'name': 'F-buurt', 'size': 232024},
      {'name': 'Amsterdamse Poort', 'size': 431374},
      {'name': 'Hoptille', 'size': 203598},
      {'name': 'Rechte H-buurt', 'size': 196257},
      {'name': 'Hakfort Huigenbos', 'size': 294820},
      {'name': 'Huntum', 'size': 119177},
      {'name': 'Vogeltjeswei', 'size': 72302},
      {'name': 'Bijlmerpark West', 'size': 510372},
      {'name': 'Velserpolder West', 'size': 498418},
      {'name': 'Venserpolder Oost', 'size': 322715},
      {'name': 'D-buurt', 'size': 277037}]},
    {'name': 'Bijlmer Oost EGK',
     'children': [{'name': 'Kortvoort', 'size': 222345},
      {'name': 'Kelbergen', 'size': 217988},
      {'name': 'K-buurt Zuidwest', 'size': 168485},
      {'name': 'Bijlmerpark Oost', 'size': 154086},
      {'name': 'G-buurt Noord', 'size': 80655},
      {'name': 'G-buurt West', 'size': 426830},
      {'name': 'Bijlmermuseum Noord', 'size': 165324},
      {'name': 'K-buurt Midden', 'size': 160326},
      {'name': 'K-buurt Zuidoost', 'size': 196007},
      {'name': 'Grunder Koningshoef', 'size': 131278},
      {'name': 'E-buurt', 'size': 319488},
      {'name': 'G-buurt Oost', 'size': 971099},
      {'name': 'Kantershof', 'size': 604468},
      {'name': 'Bijlmermuseum Zuid', 'size': 257643}]},
    {'name': 'Nellestein',
     'children': [{'name': 'L-buurt', 'size': 763814},
      {'name': 'Gaasperpark', 'size': 847153},
      {'name': 'Gaasperplas', 'size': 1337700}]},
    {'name': 'Holendrecht Reigersbos',
     'children': [{'name': 'Holendrecht West', 'size': 350299},
      {'name': 'Reigersbos Noord', 'size': 369396},
      {'name': 'Holendrecht Oost', 'size': 665679},
      {'name': 'Reigersbos Midden', 'size': 251221},
      {'name': 'Reigersbos Zuid', 'size': 630370},
      {'name': 'Gaasperdam Noord', 'size': 253103},
      {'name': 'Gaasperdam Zuid', 'size': 192504}]},
    {'name': 'Gein',
     'children': [{'name': 'Gein Noordwest', 'size': 319384},
      {'name': 'Gein Zuidwest', 'size': 180914},
      {'name': 'Gein Noordoost', 'size': 647836},
      {'name': 'Gein Zuioost', 'size': 773297}]},
    {'name': 'Driemond',
     'children': [{'name': 'Dorp Driemond', 'size': 350714},
      {'name': 'Landelijk gebied Driemond', 'size': 1672590}]}]}]}
