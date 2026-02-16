
# Describing a `Placement`: Specification

### Determinants of placement availability 

|Field name|Options|Cardinality|Data Type & Format|
|----------|-------|-----------|------------------|
| `Child ID` |*ID no.*| 1|integer|
| `When placement is needed by` <div class="open-issue-marker" hovertext="preferredlocation">🛈<span id='preferredlocation' class='hover-text'> Open issue - see specification in depth</div>| *Today, in less than 5 days, in more than 5 days* | 0, 1| Categorical |
|`Number of siblings to place with` |*number*|0, 1 |integer | |
|`Preferred location for home search` <div class="open-issue-marker" hovertext="preferredlocation">🛈<span id='preferredlocation' class='hover-text'> Open issue - see specification in depth</div> |*freetext*|0, 1 |string| |

<a href="https://github.com/SocialCareData/placements-standard/issues/new?template=content_issue.yml&title=Issue+regarding+Placement+Availability+Fields" class="web-button" target="_blank">Raise an issue about this category</a>

### Placement requirements

|Field name|Options|Cardinality|Data Type & Format|
|----------|-------|-----------|------------------|
| `Communication, language and learning needs` | *Y/N/Not Specified* |	1 |	Categorical |
| `Specific communication and language requirements` | *ESOL, BSL, Makaton, Other, None*| 	1, MANY | Categorical |
| `Adaptation to the home` |	*Y/N* | 1 |Boolean | 
| `Cultural needs (e.g. place of worship)` | *Required, Not required, Not Known, Other*  |	1 | Categorical | 
| `Who can the child be cared for alongside?` | *Solo placement recommended, With other children recommended, Only with other older children, Only with other younger children, No preference* |	1 (MUST)	| Categorical | 
| `Can the child live with pets/animals?` | *Yes - must/Yes - can/ No /Not Known*|	1 (MUST) | Categorical | 
|`Additional support (Please specify)`	| *additional supervision, therapeutic support, a worker for respite, taxis to school, NA, other (please specify)* |0, 1 |Categorical | | 
|`Deprivation of Liberty Order`	| *Yes, No* |0, 1	|Boolean | | 

<a href="https://github.com/SocialCareData/placements-standard/issues/new?template=content_issue.yml&title=Issue+regarding+Placement+Requirements+Fields" class="web-button" target="_blank">Raise an issue about this category</a>

### Placement Recommendation
|Field name|Options|Cardinality|Data Type & Format|
|----------|-------|-----------|------------------|
| `Foster care suitability`|*Preferred, Suitable but not preferred, Unsuitable, Not specified* | 1 |	Categorical |
| `Residential care suitability`	|*Preferred, Suitable but not preferred, Unsuitable, Not specified*  | 1 |	Categorica |
| `Supported Accomodation suitability` | *Preferred, Suitable but not preferred, Unsuitable, Not specified*|	1 | Categorical |

<a href="https://github.com/SocialCareData/placements-standard/issues/new?template=content_issue.yml&title=Issue+regarding+Placement+Requirements+Fields" class="web-button" target="_blank">Raise an issue about this category</a>

### Risks
|Field name|Options|Cardinality|Data Type & Format|
|----------|-------|-----------|------------------|
|`Risk to child: Self-harm`	|*No known risk, Risk Present* |1 |Categorical| |
|`Risk to child: Sexual exploitation`	| *No known risk, Risk Present* |1 |Categorical| |
|`Risk to child: Criminal exploitation`| *No known risk, Risk Present* |	1 |Categorical | | 
|`Risk to child: Drug and alcohol use	`| *No known risk, Risk Present* | 1 |	Categorical | |
|`Risk to child: Eating disorder	`| *No known risk, Risk present* | 1 |	Categorical | |
|`Risk to child: Going missing`	| *No known risk, Risk Present* | 1 	|Categorical | |
|`Risk to child: Other (please specify)`	| *free text* |0, 1|	String | |
|`Risk to others or property: Physical harm`	| *No known risk, Risk Present* |1 |	Categorical | |
|`Risk to others or property: Sexual harm`	| *No known risk, Risk Present* |1 |	Categorical | |
|`Risk to others or property: Fire-setting`	| *No known risk, Risk Present* |1 |	Categorical | |
|`Risk to others or property: Harm to animals`	| *No known risk, Risk Present* | 1 	|Categorical | | 
|`Risk to others or property: Criminal exploitation	`| *No known risk, Risk Present*| 1	|Categorical | | 
|`Risk to others or property: Other (please specify)	`| *free text* |0, 1| 	String | |

<a href="https://github.com/SocialCareData/placements-standard/issues/new?template=content_issue.yml&title=Issue+regarding+Risk+of+harm+to+others+or+property+Fields" class="web-button" target="_blank">Raise an issue about this category</a>

### Actual placement
|Field name|Options|Cardinality|Data Type & Format|
|----------|-------|-----------|------------------|
|`Total Weekly Cost (actual weekly fee paid)`<div class="open-issue-marker" hovertext="preferredlocation">🛈<span id='preferredlocation' class='hover-text'> Open issue - see specification in depth</div>|*number* |1| integer | 
|`Placement Location`	|*free text* |1| String | 
|`Preferabilty of placement location`	|*Yes, No* |1| Boolean | 
|`Education Continuity`	|*Yes, No* |1| Boolean | 
|`Provider URN (linked to Ofsted)`	| *free text*| 1|	String | | 
|`How many siblings were placed together?`<div class="open-issue-marker" hovertext="preferredlocation">🛈<span id='preferredlocation' class='hover-text'> Open issue - see specification in depth</div>|*Number*| 1|	Integer | |
|`Placement Type`	| *Residential, Foster, Supported Accommodation* |1| 	Categorical | |

<a href="https://github.com/SocialCareData/placements-standard/issues/new?template=content_issue.yml&title=Issue+regarding+Actual+Placement+Fields" class="web-button" target="_blank">Raise an issue about this category</a>

### Quality Assurance

|Field name|Options|Cardinality|Data Type & Format|
|----------|-------|-----------|------------------|
|`Name of officer (referral)` | *free text*	|0, 1|	String |  | 
|`Date of Data entry (referral)`	| *date* |1 |	date | |
|`Name of officer (placement)`	| *free text* |1 |	String | |
|`Date of Data entry (placement)`	| *date* |1 |	date | |
|`Name of officer (placement cost)` | *free text*	|0, 1|	String |  | 
|`Date of Data entry (placement cost)`	| *date* |1 |	date | |


<a href="https://github.com/SocialCareData/placements-standard/issues/new?template=content_issue.yml&title=Issue+regarding+Quality+Assurance+Fields" class="web-button" target="_blank">Raise an issue about this category</a>

