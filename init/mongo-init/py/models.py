from collections import namedtuple

Index = namedtuple("Index", "collection field type")
DataSource = namedtuple("DataSource", "series component file")
Location = namedtuple("Location", "lat lon region municipality")
