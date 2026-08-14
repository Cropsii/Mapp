import { MercatorLayer } from "@mercator-blue/sdk/react/maplibre";
import { Card, Flex, Select, Slider } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";

export const MercatorLayers = () => {
  const [dataSet, setDataSet] = useState("");
  const [visOption, setVisOption] = useState("raster");
  const [colormap, setColormap] = useState("turbo");
  const [opacity, setOpacity] = useState(1);
  const [particleCount, setParticleCount] = useState(1000);
  const [pointSize, setPointSize] = useState(3);
  const dataOptions = [
    {
      label: "Пусто",
      value: "",
    },
    {
      label: "Видимая температура",
      value: "apptemp",
    },
    {
      label: "Конвективная доступная потенциальная энергия (поверхность)",
      value: "cape",
    },
    {
      label: "Общий облачный покров",
      value: "cloudcover",
    },
    {
      label: "Поверхностный угарный газ (CO)",
      value: "co",
    },
    {
      label: "Поверхностные течения океана",
      value: "currents",
    },
    {
      label: "Глобальная высота (топография + батиметрия)",
      value: "elevation",
    },
    {
      label: "Порыв ветра",
      value: "gust",
    },
    {
      label: "2 метра относительной влажности",
      value: "humidity2m",
    },
    {
      label: "Среднее давление на уровне моря",
      value: "mslp",
    },
    {
      label: "Поверхностный диоксид азота (NO2)",
      value: "no2",
    },
    {
      label: "Поверхностная концентрация PM2.5",
      value: "pm25",
    },
    {
      label: "3-часовые накопленные осадки",
      value: "precip3h",
    },
    {
      label: "Общая осадки воды",
      value: "pwat",
    },
    {
      label: "Отражательная способность композитного радара",
      value: "reflectivity",
    },
    {
      label: "Глубина снега (поверхность)",
      value: "snowdepth",
    },
    {
      label: "Поверхностный диоксид серы (SO2)",
      value: "so2",
    },
    {
      label: "Поток коротковолнового излучения вниз",
      value: "solarflux",
    },
    {
      label: "Значительная высота волны",
      value: "swh",
    },
    {
      label: "Температура 2 метра",
      value: "temp2m",
    },
    {
      label: "Видимость поверхности",
      value: "visibility",
    },
    {
      label: "Ветер 100 метров",
      value: "wind100m",
    },
    {
      label: "10-метровый ветер",
      value: "wind10m",
    },
  ];
  const visOptions = [
    { label: "картинка", value: "raster" },
    { label: "Стреклки", value: "arrows" },
    { label: "Линии потока", value: "streamlines" },
    { label: "Контуры", value: "contours" },
    { label: "Цифры", value: "values" },
    { label: "Границы", value: "bounds" },
  ];
  const colormapOptions = [
    { label: "Viridis", value: "viridis" },
    { label: "Turbo", value: "turbo" },
    { label: "Magma", value: "magma" },
    { label: "Inferno", value: "inferno" },
    { label: "Plasma", value: "plasma" },
    { label: "Cividis", value: "cividis" },
  ];
  return (
    <Card>
      <MercatorLayer
        pointSize={pointSize}
        smooth={true}
        particleCount={particleCount}
        opacity={opacity}
        viz={visOption}
        dataset={dataSet}
        colorBySpeed={true}
        colormap={colormap}
        apiKey={import.meta.env.VITE_APP_MERCATOR}
      ></MercatorLayer>
      <Flex vertical gap={10}>
        <FormItem label="Данные">
          <Select
            placeholder="Выберите данные"
            style={{ width: "100%" }}
            onChange={(e) => setDataSet(e)}
            options={dataOptions}
          ></Select>
        </FormItem>
        <FormItem label="Стиль">
          <Select
            style={{ width: "100%" }}
            defaultValue={"картинка"}
            onChange={(e) => setVisOption(e)}
            options={visOptions}
          ></Select>
        </FormItem>
        <FormItem label="Палитра">
          <Select
            options={colormapOptions}
            style={{ width: "100%" }}
            defaultValue={"turbo"}
            onChange={(e) => setColormap(e)}
          ></Select>
        </FormItem>
        <FormItem label="Прозрачность">
          <Slider
            value={opacity}
            onChange={(e) => setOpacity(e)}
            min={0}
            max={1}
            step={0.1}
          ></Slider>
        </FormItem>
        <FormItem label="Количесвто частиц">
          <Slider
            max={4000}
            min={200}
            onChangeComplete={(e) => setParticleCount(e)}
          ></Slider>
        </FormItem>
        <FormItem label="Размер частицы">
          <Slider
            max={10}
            min={1}
            onChangeComplete={(e) => setPointSize(e)}
          ></Slider>
        </FormItem>
      </Flex>
    </Card>
  );
};
